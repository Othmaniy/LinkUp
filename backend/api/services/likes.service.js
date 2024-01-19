const pool =require("../../config/db.config")
const newlike=(data,tokenid,callback)=>{
    // if(tokenid==data.userid){
    //     return callback(null,"youcanot like your own post")
    // }
const q2= `INSERT INTO likes(user_id,post_id) VALUES (?)`
    const  values=[
            tokenid,
           data.postid,
            ]
            pool.query(q2,[values],(err,data)=>{
                if(err){
                    return callback(err)
                }
                return callback(null,data)
            })
}
const deletelikeservice=(data,tokenid,callback)=>{
    const q2= `DELETE FROM likes WHERE user_id=? AND post_id=?`
      
                pool.query(q2,[tokenid,data.query.postid],(err,data)=>{
                    if(err){
                        return callback(err)
                    }
                    return callback(null,data)
                })
    }
module.exports={
    newlike,deletelikeservice
}