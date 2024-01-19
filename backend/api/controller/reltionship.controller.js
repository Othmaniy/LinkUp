const pool =require("../../config/db.config")
const jwt =require("jsonwebtoken")
const {newrelationship,deleterelationshipservice} = require("../services/relationship.service")
const getrelationships=(req,res)=>{
    const q =`SELECT followeruser FROM relationship WHERE followeduser =?`
    pool.query(q,[req.query.followeduser],(err,data)=>{
        if(err){
            return res
            .status(500)
            .json(err)
        }
        return res
        .status(200)
        .json(data.map(relationship=>relationship.followeruser))
    })

}
const addrelationships = (req, res) => {
    const token = req.cookies.accesstoken;
     if (!token) {
       return res.status(401).json("not logged in");
     }
     jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
       if (err) {
         return res.status(403).json("token not valid");
       }
      newrelationship(req.body,userdata.id,(err,data)=>{
       if(err){
         return res.status(500).json(err);
       }
       else {
        console.log(data);
         return res.status(200).json("followed  successfully");
        
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

   const deleterelationships = (req, res) => {
    const token = req.cookies.accesstoken;
     if (!token) {
       return res.status(401).json("not logged in");
     }
     jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
       if (err) {
         return res.status(403).json("token not valid");
       }
       
      deleterelationshipservice(req,userdata.id,(err,data)=>{
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

module.exports={
    getrelationships,
    addrelationships,
    deleterelationships
}