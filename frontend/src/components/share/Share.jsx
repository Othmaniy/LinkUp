import React, { useContext, useState } from 'react'
import "./share.css"
import { AuthContext } from '../context/authcontext'
import gallery from "../../assets/picture_2659360.png"
import message from "../../assets/comments_2190552.png"
import friend from "../../assets/friends_880594.png"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import getRequest from '../axios/axios'


function Share() {
  const [file,setFile]=useState(null);
  const [postdescr,setPostdescr]=useState("")

  const upload=async()=>{
    try{
      const formData = new FormData();
      formData.append("file",file)
       //httplocalhost4000api
      const res= await getRequest.post("/upload",formData)
      return res.data
  
    }
    catch(err){
      console.log(err);
    }
  }
  const {currentUser}=useContext(AuthContext)

  const mutation = useMutation((newPost)=>{
    return getRequest.post("/posts",newPost)
   
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["post"])
    },
  })

   
const queryClient=useQueryClient();


  // Mutations
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Share button clicked");
  
    let imageUrl = "";
    
    if (file) {
      console.log("File selected:", file);
      
      try {
        imageUrl = await upload();
        console.log("Image uploaded successfully:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Add appropriate error handling if needed
        return;
      }
    } else {
      console.log("No file selected");
    }
  
    console.log("Posting with imageUrl:", imageUrl);
    
    mutation.mutate({ postdescr, postimage: imageUrl });
    setPostdescr("");
    setFile(null);
  };
  
  
  return (
    <div className='share mt-1 mb-3'>
        <div className='sharecontainer shadow'>
          
          <div className='inputs'>
          <div className='leftSideInput'>
          <img src={"/upload/"+currentUser.
profilepicture
} alt="" className='profile and' />
            <input type="text" placeholder={`what is on your mind ${currentUser.name}`} className='postinput' onChange={(e)=>{setPostdescr(e.target.value)}} value={postdescr} />
          </div>
          <div className="rightSideInput">
            {file&& <img className='postImagePreview' src={URL.createObjectURL(file)} />}
          </div>
          </div>
         
          
           <div className='itemsandbutton'> 
           <div className='items'>
               
                  <input type="file" id='file' style={{display:"none"}} onChange={(e)=>{setFile(e.target.files[0])}} />
                  <label htmlFor="file">
                  <div className='items'>
                  <img src={gallery} alt="" className='icons'/>
                   <span  className="">add image</span>
                  </div>
                  </label>
               

                
                <div className='items mr-3'>
                <img src={message} alt="" className='icons'  />
                <span>add place</span>
                </div>
                <div className='items'>
                <img src={friend} alt="" className='icons' />
                <span>tagfrend</span>
                </div>
            </div>
            <button className='sharebutton' onClick={handleClick}>post</button>
           </div>
            
        </div>

    </div>
  )
}

export default Share