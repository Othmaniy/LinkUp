const pool=require("../../config/db.config")
const jwt = require("jsonwebtoken")
const { newlike, deletelikeservice } = require("../services/likes.service")
const getlikes=(req,res)=>{
    const q =`SELECT user_id FROM likes WHERE post_id =?`
    pool.query(q,[req.query.postid],(err,data)=>{
        if(err){
            return res
            .status(500)
            .json(err)
        }
        return res
        .status(200)
        .json(data.map(like=>like.user_id))
    })

}
const addlike = (req, res) => {
    const token = req.cookies.accesstoken;
     if (!token) {
       return res.status(401).json("not logged in");
     }
     jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
       if (err) {
         return res.status(403).json("token not valid");
       }
      newlike(req.body,userdata.id,(err,data)=>{
       if(err){
         return res.status(500).json(err);
       }
       else {
        console.log(data);
         return res.status(200).json("liked successfully");
        
       }
      })

   
     //  const q = `SELECT p.*,u.user_id,username,profilepicture FROM post AS p JOIN user AS u ON (u.user_id=p.user_id) LEFT JOIN relationship AS r ON (p.user_id=r.followeduser) WHERE r.followeruser= ? OR p.user_id =? ORDER BY p.createdat DESC`;
     //  pool.query(q, [userdata.id,userdata.id], (err, data) => {
     //    if (err) {
     //      return res.status(500).json(err);
     //    } else {
     //      return res.status(200).json(data);
     //    }
     //  });
   
     });
    //  console.log("Inside getposts");
   };


   const deletelike = (req, res) => {
    const token = req.cookies.accesstoken;
     if (!token) {
       return res.status(401).json("not logged in");
     }
     jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
       if (err) {
         return res.status(403).json("token not valid");
       }
       
      deletelikeservice(req,userdata.id,(err,data)=>{
       if(err){
         return res.status(500).json(err);
       }
       else {
        console.log(data);
         return res.status(200).json("like deleted successfully");
        
       }
      })
      
   
     //  const q = `SELECT p.*,u.user_id,username,profilepicture FROM post AS p JOIN user AS u ON (u.user_id=p.user_id) LEFT JOIN relationship AS r ON (p.user_id=r.followeduser) WHERE r.followeruser= ? OR p.user_id =? ORDER BY p.createdat DESC`;
     //  pool.query(q, [userdata.id,userdata.id], (err, data) => {
     //    if (err) {
     //      return res.status(500).json(err);
     //    } else {
     //      return res.status(200).json(data);
     //    }
     //  });
   
     });
    //  console.log("Inside getposts");
   };
module.exports={getlikes,addlike,deletelike}