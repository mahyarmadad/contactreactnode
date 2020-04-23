const express = require('express')
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middaleware/auth");

//Login User
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.send(500).send("Server Error");
    }
});
const errorFormatter = ({ msg }) => {
    return `${msg}`;
};

//Get Toekn
router.post("/", [check("email", "Please include a Valid Email").isEmail(),
check("password", "Password Required ").exists()], async (req, res) => {
    const error = validationResult(req).formatWith(errorFormatter);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

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
        console.log(err.mesaage);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
