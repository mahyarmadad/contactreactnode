const express = require('express')
const router = express.Router();
const Contact = require("../models/Contact");
const User = require("../models/User");
const { check, validationResult } = require('express-validator');
const auth = require("../middaleware/auth");


//Get Contact
router.get("/", auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Add Contact
router.post("/", [auth, check("name", "Name is required").not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
        const newcontact = new Contact({ name, email, phone, type, user: req.user.id });
        const contact = await newcontact.save();
        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Update Contact
router.put("/:id", auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contactfields = {};
    if (name) contactfields.name = name;
    if (email) contactfields.email = email;
    if (phone) contactfields.phone = phone;
    if (type) contactfields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact Not Found" })
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Aauthorized" });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactfields }, { new: true });
        res.json(contact)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Delete Contact
router.delete("/:id", auth, async (req, res) => {

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact Not Found" })
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Aauthorized" });
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact Deleted" });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
