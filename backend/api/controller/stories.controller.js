const pool =require("../../config/db.config");
const jwt = require("jsonwebtoken");
const {createnewstory,selectstory} = require("../services/stories.service")
const createstory =(req,res)=>{
    const token = req.cookies.accesstoken;
    if(!token){
        return res.status(401).json("not loggen in");
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,userdata)=>{
        if(err){
            return res.status(403).json("token not valid");
        }
        createnewstory(req.body,userdata.id,(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
            if(data.affectedRows>0){
                return res.status(200).json("storie created successfully");
               }
               return res.status(403).json("you can create only your story");
        })
    })
}

const getstories =(req,res)=>{
    const token = req.cookies.accesstoken;
    if (!token) {
      return res.status(401).json("not logged in");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
      if (err) {
        return res.status(403).json("token not valid");
      }
      selectstory(req,userdata.id,(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        else{
            return res.status(200).json(data)
        }
      })

})}

module.exports={
    createstory,getstories
}