const pool = require("../../config/db.config")
const moment =require("moment")

const selectpost=(req,tokenid,callback)=>{
    const userid =parseInt(req.query.userid);
    console.log(typeof(userid));
    
    const q = userid ? `SELECT DISTINCT p.*,u.user_id,name,profilepicture FROM post AS p JOIN user AS u ON (u.user_id=p.user_id) WHERE p.user_id=?`:`SELECT DISTINCT p.*,u.user_id,name,profilepicture FROM post AS p JOIN user AS u ON (u.user_id=p.user_id) LEFT JOIN relationship AS r ON (p.user_id=r.followeduser) WHERE r.followeruser= ? OR p.user_id =? ORDER BY p.createdat DESC`;
    const values = userid ? [userid]:[tokenid,tokenid];
    pool.query(q,values,(err,data)=>{
        if(err){
            return callback(err)
        }
        return callback(null,data)

    })
}
const createnewpost=(data,tokenid,callback)=>{
    const q1=`INSERT INTO post(postdescr,user_id,postimage,createdat) VALUES (?)`;
    const values=[
        data.postdescr,
        tokenid,
        data.postimage,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
       ]
    pool.query(q1,[values],(err,data)=>{
        if(err){
            return callback(err)
        }
        return callback(null,data)

    })
}

const deletepostservice =(reqdata,tokenid,postid,callback)=>{
    console.log("type of post id "+typeof(postid));
    const postidint=parseInt(postid)
    const q5= 'DELETE FROM post WHERE post_id=? AND user_id=?'
    pool.query(q5,[postidint,tokenid],(err,results)=>{
        if(err){
            return callback(err)
        }
        else{
            return callback(null,results)
        }
    })

}
module.exports={
    selectpost,
    createnewpost,
    deletepostservice
}
//"Cannot delete or update a parent row: a foreign key constraint fails (`socialmeadiaapp`.`likes`, CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON UPDATE CASCADE)"
// "Cannot delete or update a parent row: a foreign key constraint fails (`socialmeadiaapp`.`likes`, CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON UPDATE CASCADE)"