const express = require('express')
const router = express.Router();

//Get Contact
router.get("/", (req, res) => {
    res.send("Get Contact")
});

//Add Contact
router.post("/", (req, res) => {
    res.send("Add Contact")
});

//Update Contact
router.put("/:id", (req, res) => {
    res.send("Update Contact")
});

//Delete Contact
router.delete("/:id", (req, res) => {
    res.send("Delete Contact")
});
module.exports = router;
