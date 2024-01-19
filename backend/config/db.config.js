const mysql =require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database  :process.env.DB,
    connectionLimit:10
  });
  
  pool.getConnection((err) =>{
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected successfully ');
  });

  // let registration = `CREATE TABLE if not exists user(
  //   user_id int auto_increment,
  //   user_name varchar(255) not null,
  //   user_email varchar(255) not null,
  //   user_password varchar(255) not null,
  //   user_type varchar(255),
  //   PRIMARY KEY(user_id)

  // )`;

  let user =`CREATE TABLE IF NOT EXISTS user (
    user_id int auto_increment,
    username varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    name varchar(255) not null ,
    coverpic varchar(255),
    profilepicture varchar(255),
    location varchar(255),
    website VARCHAR(255),
    PRIMARY KEY (user_id)
  )`
  let post =`CREATE TABLE IF NOT EXISTS post (
    post_id int auto_increment,
    user_id int,
    postdescr varchar(255) not null,
    postimage varchar(255),
    createdat DATETIME,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE

  )`
  let comment =`CREATE TABLE IF NOT EXISTS comment (
    comment_id int auto_increment,
    comment_user_id int not null,
    post_id int,
    comentdescr varchar(255),
    createdat DATETIME,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (comment_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE

  )`
  
  let stories = `CREATE TABLE IF NOT EXISTS stories (
    story_id INT AUTO_INCREMENT,
    storyimage VARCHAR(255),
    user_id INT NOT NULL,
    createdat DATETIME,
    PRIMARY KEY (story_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES post(user_id) ON DELETE CASCADE

  )`
  let relationship = `CREATE TABLE IF NOT EXISTS relationship (
    relationship_id INT AUTO_INCREMENT,
    followeruser INT NOT NULL,
    followeduser INT NOT NULL,
    PRIMARY KEY (relationship_id),
    FOREIGN KEY (followeruser) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (followeruser) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followeduser) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (followeduser) REFERENCES user(user_id) ON DELETE CASCADE

  )`
  let likes = `CREATE TABLE IF NOT EXISTS likes (
    like_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY (like_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE

  )`

  pool.query(user,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("user table ctreated successfully");
    }
  })
  pool.query(post,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("post table created successfully");
    }
  })
  pool.query(comment,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("comment table create successfully");
    }
  })
  pool.query(likes,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("like table create successfully");
    }
  })
  pool.query(relationship,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("relationship table created successfully");
    }
  })
  pool.query(stories,(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("stories table create successfully");
    }
  })
//   let profile = `CREATE TABLE if not exists profile(
//     user_profile_id int auto_increment,
//     user_id int,
//     first_name varchar(255),
//     last_name varchar(255),
//     PRIMARY KEY(user_profile_id),
//     FOREIGN KEY (user_id) REFERENCES registration(user_id)

//   )`;
//   let question = `CREATE TABLE if not exists question(
//     question_id int auto_increment,
//     question varchar(255),
//     question_description varchar(255),
//     post_id int,
//     user_id int,
//     PRIMARY KEY(question_id),
//     FOREIGN KEY (user_id) REFERENCES registration(user_id)

//   )`;
//   let answer = `CREATE TABLE if not exists answer(
//     answer_id int auto_increment,
//     answer varchar(255) not null,
//     user_id int,
//     question_id int,
//     PRIMARY KEY(answer_id),
//     FOREIGN KEY (user_id) REFERENCES registration(user_id),
//     FOREIGN KEY (question_id) REFERENCES question(question_id)

//   )`;
//   pool.query(registration,(err,result)=>{
//     if (err){
//       console.log(err);
//     }
//     else{
//       console.log("registration table created");
//     }
//   })
//   pool.query(profile,(err,result)=>{
//     if (err){
//       console.log(err);
//     }
//     else{
//       console.log("profile table created");
//     }
//   })
//   pool.query(question,(err,result)=>{
//     if (err){
//       console.log(err);
//     }
//     else{
//       console.log("question table created");
//     }
//   })
//   pool.query(answer,(err,result)=>{
//     if (err){
//       console.log(err);
//     }
//     else{
//       console.log("answer table created");
//     }
//   })

  module.exports = pool;