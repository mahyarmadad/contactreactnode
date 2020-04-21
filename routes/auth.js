const express = require('express')
const router = express.Router();

//Get User
router.get("/", (req, res) => {
    res.send("Get User")
});

//Get Toekn
router.post("/", (req, res) => {
    res.send("Get token")
});

module.exports = router;
