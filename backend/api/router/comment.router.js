const express =require("express");
const app=express();
const router =express.Router();
const {getcomments,addcomment }=require("../controller/comment.controller")
router.get("/",getcomments);
router.post("/",addcomment)

module.exports=router;