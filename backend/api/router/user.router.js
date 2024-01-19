const express = require("express");
const router = express.Router();
const {getuser,UpdateUser,getfriends}= require("../controller/user.controller")

router.get("/profilefor/:userid",getuser)
router.put("/",UpdateUser)
// for selecting friends
router.get("/",getfriends)

module.exports = router;