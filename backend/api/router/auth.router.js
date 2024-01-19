const express = require("express");
const router = express.Router();
const {createAccount, login} =require("../controller/auth.controller")

router.post("/createaccount",createAccount)
router.post("/login",login)
// router.post("/logout",logout)

module.exports = router;