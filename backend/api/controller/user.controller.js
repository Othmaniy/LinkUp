const pool=require("../../config/db.config");
const jwt = require("jsonwebtoken")
const {UpdateService} =require("../services/user.service")
const getuser=(req,res)=>{
    const userid =req.params.userid
const q =`SELECT * FROM user WHERE user_id =? `
pool.query(q,[userid],(err,data)=>{
    if(err){
        return res
        .status(500)
        .json(err)
    }
const {password,...userinfo} =data[0]
    return res
    .status(200)
    .json(userinfo)
})
}

const UpdateUser =(req,res)=>{
    const token = req.cookies.accesstoken;
     if (!token) {
       return res.status(401).json("not logged in");
     }
     jwt.verify(token, process.env.SECRET_KEY, (err, userdata) => {
        if (err) {
          return res.status(403).json("token not valid");
        }
        UpdateService(req.body,userdata.id,(err,results)=>{
            if(err){
                res.status(500).json(err)
            }
            
            // res.status(200).json(results)
            if(results.affectedRows>0){
                res.status(200).json("updated successfully");
            }
           
            // console.log(results);
        })


     })
}


const getfriends =(req,res)=>{
    const q= "SELECT * FROM user"

    pool.query(q,(err,results)=>{
        if(err){
            return res.status(500).json(err)
        }
    //    const userwithoutpassword = results.map((user)=>(

    //    ))

       const usersWithoutPassword = results.map(user => {
        const { password, ...userDataWithoutPassword } = user;
        return userDataWithoutPassword;
    });
        return res.status(200).json(usersWithoutPassword)
    })
}
module.exports={
    getuser,UpdateUser,getfriends
}



//2793.74