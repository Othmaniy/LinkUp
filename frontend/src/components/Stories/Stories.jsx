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
  // const [storyFile,setstoryFile]=useState(null);
  const [storyFile, setstoryFile] = useState(null);

  const upload=async()=>{
    try{
      const formData = new FormData();
      formData.append("file",storyFile)
      const res= await getRequest.post("/upload/stories",formData)
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
    if(storyFile) imageUrl = await upload();
    mutation.mutate({storyimage:imageUrl});
    setstoryFile(null)

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
        <input type="file" id='storyfile' className='storyinput' onChange={(e)=>{setstoryFile(e.target.files[0])}} />
        <label htmlFor="storyfile">
        <p className='add'>+</p>
        </label>
        <button className='storyshare' onClick={handleStory} style={{zIndex:1}}>s</button>
        
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