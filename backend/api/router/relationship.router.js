const express =require("express");
const router = express.Router();
const {getrelationships,addrelationships,deleterelationships} = require("../controller/reltionship.controller")
router.get("/",getrelationships);
router.post("/",addrelationships);
router.delete("/",deleterelationships);

module.exports=router;