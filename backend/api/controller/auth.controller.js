const pool =require("../../config/db.config")
const {CreateNewUser, getUserByEmail }= require ("../services/auth.service")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
require("dotenv").config()


const createAccount =(req,res)=>{
    // const UserExists=CheckUserExists(req.body.email);
    // if(UserExists){
    //     return res.status(409).json({message:"user already exissts"})
    // }
    // else{

    // }
    const sql =`SELECT * FROM user WHERE email =?`
    pool.query(sql,[req.body.email],(err,results)=>{
        if(err){
            return res.status(500).json({message:"database connection error"})
        }
        if(results.length>0){
            return res.status(409).json({message:"user already exists"})
        }
        CreateNewUser(req.body,(err,results)=>{
            if(err){
                return res.status(500).json({message:"database connection error"})
            }
            else{
                console.log(results);
                const response={
                    status:"sucess",
                    message:"user created successfully"
                }
                res.status(200).json(
                    // {message:"user added successfully",
                    // data:results}
                    response
            )
            }
        })

    })
    

   

}
const login =(req,res)=>{
    getUserByEmail(req.body.email,(err,results)=>{
        if(err){
            return res
            .status(500)
            .json({message:"database connection error"})
        }
        if(results.length==0){
            return res
            .status(404)
            .json({message:"user not found "})
        }
        console.log(results[0]);
        const checkPassword = bcrypt.compareSync(req.body.password,results[0].password)
        console.log(checkPassword);
        if(!checkPassword){
            return res
            .status(400)
            .json({
                message:"invalid credentials"
            })
        }
        const token =jwt.sign({id:results[0].user_id},process.env.SECRET_KEY,{expiresIn:"1h"});
        const{password,...others}=results[0];
        res
        .cookie("accesstoken",token,{
            httpOnly:true,
    //         
        })
        .status(200)
        .json(others)
        // json("login");


    })
}
// const logout=(req,res)=>{
//     res.clearCookie("accesstoken",{
//         secure:true,
//         sameSite:"none"
//     })
//     .status(200).json("loged out successfully")

// }

module.exports={
    createAccount,
    login
   
}