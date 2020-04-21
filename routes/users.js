const express = require('express')
const router = express.Router();

//Registeer User
router.post("/", (req, res) => {
    res.send("Register User")
});


module.exports = router;
