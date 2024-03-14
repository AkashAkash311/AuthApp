const express = require('express')
const router = express.Router();

// Require controller modules.

const {login, signup} = require("../Controller/Auth");

router.post("/login", login);
router.post( "/signup", signup );

module.exports = router;