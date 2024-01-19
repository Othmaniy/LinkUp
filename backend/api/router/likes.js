const express =require("express");
const router =express.Router()
const {getlikes,addlike,deletelike} =require("../controller/likes.controller")

router.get("/",getlikes)
router.post("/",addlike)
router.delete("/",deletelike)

module.exports=router