const mysql=require("mysql")
require ("dotenv").config();
const express = require("express")
const pool = require("./config/db.config")
const authRouter =require("./api/router/auth.router")
const postRouter=require("./api/router/post.router")
const commentRouter=require("./api/router/comment.router")
const likesrouter=require("./api/router/likes")
const userrouter=require("./api/router/user.router")
const relationshiprouter=require("./api/router/relationship.router")
const storiesRouter =require("./api/router/stories.router")
const port =process.env.PORT
const app =express();
const multer =require("multer")
const cors = require("cors");
const cookieparser=require("cookie-parser");
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    console.log("hello")
    next();
})
app.use(cors(
    {origin:"http://localhost:5173"}
));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieparser())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null,uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  app.post('/api/upload', upload.single('file'),  (req, res)=> {
    const file =req.file;
    res.status(200).json(file.filename)
  })
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRouter)
app.use("/api/likes",likesrouter)
app.use("/api/users",userrouter)
app.use("/api/relationships",relationshiprouter)
app.use("/api/stories",storiesRouter)
app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
