const pool = require("../../config/db.config");
const jwt = require("jsonwebtoken");
const { selectpost, createnewpost ,deletepostservice} = require("../services/posts.service");

const getposts = (req, res) => {
  // const userid=req.query.userid;
 const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(401).json("not logged in");
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
    if (err) {
      return res.status(403).json("token not valid");
    }
   selectpost(req,userdata.id,(err,data)=>{
    if(err){
      return res.status(500).json(err);
    }
    else {
      return res.status(200).json(data);
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
  console.log("Inside getposts");
};
const createpost = (req, res) => {
  const token = req.cookies.accesstoken;
   if (!token) {
     return res.status(401).json("not logged in");
   }
   jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
     if (err) {
       return res.status(403).json("token not valid");
     }
     
    createnewpost(req.body,userdata.id,(err,data)=>{
     if(err){
       return res.status(500).json(err);
     }
     if(data.affectedRows>0){
      return res.status(200).json("post created successfully");
     }
    //  return res.status(403).json("you can your own post");
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
   console.log("Inside getposts");
 };
 const deletepost=(req,res)=>{
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(401).json("not logged in");
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
    if (err) {
      return res.status(403).json("token not valid");
    }
    const postid=req.params.id
    deletepostservice(req.body,userdata.id,postid,(err,results)=>{
      if(err){
        return res.status(500).json(err)
      }
      if(results.affectedRows>0){
        return res.status(200).json("post deleted successfully")
      }
    })
 })};

module.exports = {
  getposts,
  createpost,
  deletepost
}
