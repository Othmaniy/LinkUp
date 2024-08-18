const pool =require("../../config/db.config")
const moment =require("moment")
const getcommentsserrvice=(postid,callback)=>{
    const q=`SELECT c.*,u.user_id,name,profilepicture FROM comment AS c JOIN user AS u ON (u.user_id=c.comment_user_id) WHERE c.post_id= ? ORDER BY c.createdat DESC`;
    pool.query(q,[postid],(err,data)=>{
        if(err){
            return callback(err)
        }
        return callback(null,data) 

    })

}
const newcomment=(data,tokenid,callback)=>{
    const q2= `INSERT INTO comment(comment_user_id,post_id,comentdescr,createdat) VALUES (?)`
    const  values=[
            tokenid,
           data.postid,
           data.commentdescr,
           moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            ]
            pool.query(q2,[values],(err,data)=>{
                if(err){
                    return callback(err)
                }
                return callback(null,data)
            })
}
// const newcomment=(req.body,tokenid,callback)=>{
//     const q2= `INSERT INTO comment(user_id,post_id,comentdescr,createdat) VALUES (?)`
//    const  values=[
//     tokenid,
//    req.body.postid,
//     req.body.commentdescr,
//     moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
//     ]

//     pool.query(q2,[values],(err,data)=>{
//         if(err){
//             return callback (err)
//         }
//         return callback(null,data)
//     })
// }
module.exports={
    getcommentsserrvice,newcomment
}