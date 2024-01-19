const express = require("express");
const { getposts,createpost,deletepost } = require("../controller/post.controller");
const router = express.Router();

router.get("/", getposts); // Update the route path to "/posts"
router.post("/",createpost)
router.delete("/:id",deletepost)
module.exports = router;
