// createnewstory,selectstory
const pool = require("../../config/db.config");
const moment = require("moment");

const createnewstory =(data,tokenid,callback)=>{
    const q = "INSERT INTO stories (storyimage,user_id,createdat) VALUES (?)"
    const values =[
        data.storyimage,
        tokenid,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    ]

    pool.query(q,[values],(err,results)=>{
        if(err){
            return callback(err)
        }
        return callback(null,results)
    })
}


const selectstory=(req,tokenid,callback)=>{
    const q= `SELECT DISTINCT s.*, u.user_id, username 
    FROM stories AS s 
    JOIN user AS u ON u.user_id = s.user_id 
    LEFT JOIN relationship AS r ON s.user_id = r.followeduser 
    WHERE r.followeruser = ? OR s.user_id = ?
    `

    //"SELECT s.*,u.user_id,username FROM stories AS s join users AS u ON (u.user_id=s.user_id) LEFT JOIN relationship AS r ON (s.user_id=r.followeduser) WHERE r.followeruser=NULL OR s.user_id=?"
    // "You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near '?' at line 1"
const values=[tokenid,tokenid]
    pool.query(q,values,(err,data)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,data)
        }
    })
}
module.exports ={
    createnewstory,selectstory
}