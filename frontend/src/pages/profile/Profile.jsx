import React, { useContext, useState } from 'react'
import "./profile.css"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LanguageIcon from '@mui/icons-material/Language';
import Post from '../../components/post/Post';
import Posts from '../../components/posts/posts';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import getRequest from '../../components/axios/axios'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../components/context/authcontext';
import Update from '../../components/update/Update';
function Profile() {
  const [openupdate,setOpenupdate] =useState(false)
  const {currentUser} = useContext(AuthContext)
  const userid=parseInt(useLocation().pathname.split("/")[2]);
  console.log(userid);
  console.log(typeof(userid));
  console.log(currentUser.user_id);
  console.log(currentUser.user_id);
    const { isLoading, error, data } = useQuery(["propile"], () =>
        
           getRequest.get(`/users/profilefor/${userid}`).then((res)=>{
            console.log("Response from profile API:", res.data);
            return res.data
           })
           .catch(error => {
            // navigate("/login");
            console.log(error);
            console.log('Error response data:', error.response.data);
            // console.log('Error status:', error.response.status);
           

            // Handle the error as needed
        })
        
         
  )
  console.log(data);

  const { isLoading:relaisloading, error:relerror, data:relationdata } = useQuery(["relationship"], () =>
        
  getRequest.get(`/relationships?followeduser=`+userid).then((res)=>{
   console.log("Response from profile relationship API:", res.data);
   return res.data
  })
  .catch(error => {
   // navigate("/login");
   console.log(error);
  //  console.log('Error response data:', error.response.data);
   // console.log('Error status:', error.response.status);
  

   // Handle the error as needed
})


)
console.log(relationdata);
const mutation = useMutation((follow)=>{
  console.log(follow);
  if(follow){
    return getRequest.delete("/relationships?userid="+ userid)
  }
  return getRequest.post("/relationships",{userid})

  
},{
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries(["relationship"])
  },
})

const queryClient=useQueryClient();
  const handlefollow=()=>{
mutation.mutate(relationdata?.includes(currentUser.user_id))
    
  }
  
  return (
    <div className='profilepage'>
      {isLoading?"loading":<div className='allContainer'>
        <div className="images">
          <img src= {"/upload/"+data?.coverpic} className='coverpicture' />
          <img src= {"/upload/"+data?.profilepicture}  className='profierpicture'  />
        </div>
        <div className="contact shadow my-3">
          <div className="icons px-3">
            <a href="facebook.com"><FacebookOutlinedIcon fontSize='large' /></a>
            <a href="facebook.com"><LinkedInIcon fontSize='large' /></a>
            <a href="facebook.com"><TwitterIcon fontSize='large'/></a>
            <a href="facebook.com"><InstagramIcon fontSize='large'/></a>
          </div>
          <div className="location mx-5">
            <p className='ppname'>{data?.username} </p>
            <div className="middleicons">
            <span className=''>{data?.location}</span>
            <AddLocationIcon className='mr-2 adloc' />
            <span className=''>{data?.website}</span>
            <LanguageIcon />
            </div>
            {userid === currentUser.user_id? (<button className='profileButton mt-2' onClick={()=>setOpenupdate(true)}>update</button>):(<button 
            onClick={handlefollow} className='profileButton mt-2'>{relationdata?.includes(currentUser.user_id)?"following":"follow"}</button>)}
            {/* <button className='profileButton mt-2'>follow</button> */}
     
            
          </div>
          <div className="message">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userid={userid} />

       
      </div>}
      {openupdate && <Update setOpenupdate = {setOpenupdate} currentdata={data} />}
     
    </div>
    
    )
}

export default Profile