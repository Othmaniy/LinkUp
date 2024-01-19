const pool = require("../../config/db.config")
const UpdateService=(da,userid,callback)=>{
    const q= "UPDATE user SET `username`=?, `coverpic`=?, `profilepicture`=? ,`location` =? ,`website`=? WHERE user_id=?"
    pool.query(q,[da.username,da.coverpicture,da.profilepicture,da.location,da.website,userid],(err,results)=>{
        if (err){
            return callback(err)
        }
        // 
        // if (results.affectedRows > 0){
        //     res.status(200).json("profile updatd successfully")

        // }
        return callback(null,results)
       

    })
}
// const getuserservice=(userid,callback)=>{
//     const q =`SELECT * from user WHERE user_id = ?`
//     pool.query(q,[userid],(err,data)=>{
//         if(err){
//             return callback(err)
//         }
//         const {password,...nopdata}=data[0]
//         console.log(nopdata);
//         return callback(null,nopdata)
//     })
// }

module.exports={
    UpdateService
}