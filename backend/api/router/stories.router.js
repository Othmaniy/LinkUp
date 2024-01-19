const express = require("express");
const router = express.Router();
const {getstories,createstory,deletestories}=require("../controller/stories.controller")

router.post("/",createstory)
router.get("/",getstories)
// router.delete("/:id",deletestories)

module.exports= router;