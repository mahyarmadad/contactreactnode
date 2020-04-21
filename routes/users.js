const express = require('express')
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Registeer User
router.post("/", [check("name", "Please Add a Name").not().isEmpty(),
check("email", "Please include a Valid Email").isEmail(),
check("password", "Please enter a Password with atleast 6 Charector").isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User Exist , Please Check your name and email or LOGIN! " });
            }
            user = new User({ name, email, password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (err) {
            console.log('====================================');
            console.log(err.mesaage);
            res.status(500).send("Server Error");
            console.log('====================================');

        }
    });


module.exports = router;
