import React, { useContext, useState } from 'react'
import "./stories.css"
import { AuthContext } from '../context/authcontext'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import getRequest from '../axios/axios';

function Stories() {
  const {currentUser} = useContext(AuthContext)
  const [file,setFile]=useState(null);
  const upload=async()=>{
    try{
      const formData = new FormData();
      formData.append("file",file)
      const res= await getRequest.post("/upload",formData)
      return res.data
  
    }
    catch(err){
      console.log(err);
    }
  }

const mutation =useMutation ((newstory)=>{
  // const response= getRequest.post("/stories",newstory);
  // console.log(response);
  return getRequest.post("/stories",newstory);
  
},{
  onSuccess:()=>{
    queryClient.invalidateQueries(["story"])
  }
})


const queryClient=useQueryClient();

//catching data
const { isLoading, error, data } = useQuery(["story"], () =>

getRequest.get("/stories").then((res)=>{
console.log("Response from stories API:", res.data);
return res.data
})
.catch(error => {

console.log('Error response data:', error.response.data);
console.log('Error status:', error.response.status);
// if(error.response.status===401||error.response.status===403){
//   navigate("/login")
// }

// Handle the error as needed
})
 .catch(error=>{
  console.log(error);
 })

)




  const handleStory=async(e)=>{
    e.preventDefault();
    let imageUrl="";
    if(file) imageUrl = await upload();
    mutation.mutate({storyimage:imageUrl});
    setFile(null)

  }
  //   const stories=[
  //       {
  //           id:1,
  //           name:"kebebe",
  //           image:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg"
  //       },
  //       {
  //         id:1,
  //         name:"kebebe",
  //         image:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg"
  //     },
  //     {
  //       id:1,
  //       name:"kebebe",
  //       image:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg"
  //   },
  //   {
  //     id:1,
  //     name:"kebebe",
  //     image:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg"
  // }
  //   ]
  return (
    <div className='stories'>
      <div className='containerr'>
        <div className='addstory'>
        <img src={currentUser.profilepic} alt="" className='storyimage' />
        <span className='storyname'>{currentUser.name}</span>
        <input type="file" id='file' className='storyinput' onChange={(e)=>{setFile(e.target.files[0])}} />
        <label htmlFor="file">
        <p className='add'>+</p>
        </label>
        <button className='storyshare' onClick={handleStory}>s</button>
        {/* <button className='add'>+</button> */}
       </div>
      { isLoading?"loading": data.map(story=>(
       <div className='singlestory'>
        <img src={"/upload/"+story.storyimage} alt="" className='storyimage' />
        <span className='storyname'>{story.username}</span>
       </div>
      )
        
      )}
    

      </div>
       
    </div>
  )
}

export default Stories