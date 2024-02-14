const pool =require("../../config/db.config")
const bcrypt = require("bcrypt");


const CreateNewUser=(data,callback)=>{
 const salt =bcrypt.genSaltSync();
 const hashedPassword = bcrypt.hashSync(data.password,salt);
 const q1 = `INSERT INTO user(username,email,password,name,lastname) VALUES(?,?,?,?,?)`
 pool.query(q1,[data.username,data.email,hashedPassword,data.name,data.lastname],(err,results)=>{
    if(err){
        return callback(err)
    }
    else{
        return callback(null,results)
    }
 })

}
const getUserByEmail=(email,callback)=>{
    const q =`SELECT * FROM user WHERE email=?`
    pool.query(q,[email],(err,results)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,results)
        }
    })
}

module.exports={
    CreateNewUser,
    getUserByEmail
}