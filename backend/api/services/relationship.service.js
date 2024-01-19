const pool =require("../../config/db.config")
const newrelationship=(data,tokenid,callback)=>{
    const q2= `INSERT INTO relationship(followeruser,followeduser) VALUES (?)`
        const  values=[
                tokenid,
               data.userid,
                ]
                pool.query(q2,[values],(err,data)=>{
                    if(err){
                        return callback(err)
                    }
                    return callback(null,data)
                })
    }
    const deleterelationshipservice=(data,tokenid,callback)=>{
        const q2= `DELETE FROM relationship WHERE followeruser=? AND followeduser=?`
          
                    pool.query(q2,[tokenid,data.query.userid],(err,data)=>{
                        if(err){
                            return callback(err)
                        }
                        return callback(null,data)
                    })
        }

        module.exports={
            newrelationship,
            deleterelationshipservice
        }