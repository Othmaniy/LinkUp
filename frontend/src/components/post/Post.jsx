import React, { useContext, useState } from 'react'
import "./post.css"
import moreicon from "../../assets/126574_more_icon.png"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import Comments from "../../components/comments/Comments"
import moment from "moment"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import getRequest from '../axios/axios'
import { AuthContext } from '../context/authcontext';
import { Button } from '@mui/material';
// import Share from '../share/share';
function Post({post}) {
const {currentUser} =useContext(AuthContext)
  const [commenttoggle,setCommenttoggle]=useState(false);
  const[deleteopen,setDeleteopen]=useState(false)
  // const liked =true
  const { isLoading, error, data } = useQuery(["likes",post.post_id], () =>
        
           getRequest.get("/likes?postid="+post.post_id).then((res)=>{
            console.log("Response from likesAPI:", res.data);
            return res.data
           })
           .catch(error => {
           
            // navigate("/login");
            console.log(error);
            console.log('Error response data:', error.response.data);
            console.log('Error status:', error.response.status);
           

            // Handle the error as needed
        })
        
         
  )
  const mutation = useMutation((liked)=>{
    if(liked){
      return getRequest.delete("/likes?postid="+ post.post_id)
    }
    return getRequest.post("/likes",{postid:post.post_id,userid:post.user_id})
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"])
    },
  })

  
  const deletemutation = useMutation((postid)=>{
    
    return getRequest.delete("/posts/"+ postid)
  

},{
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries(["post"])
  },
})

  const queryClient=useQueryClient();

  
const handleLike=()=>{
  
    mutation.mutate(data?.includes (currentUser.user_id))

}
const handleDelete=()=>{
  deletemutation.mutate(post.post_id)

}
  console.log(`data likes${data}`);
  return (
    <div>
      <div className='post '>
      <div className='container shadow'>
      <div className='user mb-3'>
          <div className='userprofile'>
            <img src={"/upload/"+post.profilepicture} alt="" className='profile' />
            <div className='profiledetails'>
              <Link style={{textDecoration:"none",color:"inherit"}} to ={`/profile/${post.user_id}`}>
                <span className='mb-0'>{post.username}</span>
              </Link>
              <span className='mt-0'>{moment(post.createdat).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={()=>setDeleteopen(!deleteopen)}/>
          {deleteopen && <button onClick={handleDelete}>delete</button>}
        </div>
        <div className='photo'>
          {/* <span className=''>{post.text}</span> */}
          <p>{post.postdescr}</p>
          <img src={"./upload/"+post.postimage} alt="" className='postimage' />
        </div>
        
        <div className='reactions d-flex mt-4'>
          <div className='singleitem mr-2'>
            {data?.includes (currentUser.user_id)?(<FavoriteIcon style={{color:'red'}} onClick={handleLike} />):(<FavoriteBorderIcon className='mx-1' onClick={handleLike} />)}
            {/* {data.includes(currentUser.user_id) ? (<FavoriteIcon/>):(<FavoriteBorderIcon className='mx-1' />)} */}
            <span>{data?.length}likes</span>
          </div>
          <div className='singleitem mx-2 commentdiv' onClick={()=>setCommenttoggle(!commenttoggle)}>
            <ModeCommentIcon className='mx-2' />
            <span className='mt-0'>comments</span>
          </div>
          <div className='singleitem mx-2'>
            <ShareIcon className='mx-2' />
            <span>share</span>
            
          </div>
         
       </div>
       {commenttoggle&&<Comments postid={post.post_id} />}
        
      </div>
        
        
    </div>
    </div>
    
    
  )
}

export default Post


