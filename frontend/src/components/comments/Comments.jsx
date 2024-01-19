import React, { useContext, useState } from 'react'
import "./comments.css"
import getRequest from '../axios/axios';
import { useNavigate } from 'react-router-dom'
// import { useQuery } from 'react-query'
import { AuthContext } from '../context/authcontext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';
function Comments({postid}) {
  const {currentUser} = useContext(AuthContext)
  const [commentdescr,setcommentdescr]=useState("")

  const { isLoading, error, data } = useQuery(["comments"], () =>
        
           getRequest.get("/comments?postid="+postid).then((res)=>{
            console.log("Response from comments API:", res.data);
            return res.data
           })
           .catch(error => {
           
            // navigate("/login");
            console.log(error);
            console.log('Error response data:', error.response.data.sql);
            console.log('Error status:', error.response.status);
           

            // Handle the error as needed
        })
        
         
  )

  const mutation = useMutation((newcomment)=>{
    return getRequest.post("/comments",newcomment)
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"])
    },
  })

  const queryClient=useQueryClient();
const handleclick=async(e)=>{
  e.preventDefault();
  mutation.mutate({commentdescr,postid});
  setcommentdescr("");

}
    // const comment=[
    //     {
    //     id:1,
    //     name:"abebe",
    //     profilepic:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg",
    //     text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur consequatur assumenda eos, soluta cum laborum totam minima quaerat delectus doloribus.",
    //     userid:2
    // },
    // {
    //     id:2,
    //     name:"ousman",
    //     profilepic:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg",
    //     text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur consequatur assumenda eos, soluta cum laborum totam minima quaerat delectus doloribus.",
    //     userid:2
    // }


// ]
  return (
    <div className='comments my-3'>
      <div className='addcomment'>
        <img src={currentUser.profilepic} alt="" />
        <input type="text" placeholder='write comment' className='commentinput' onChange={(e)=>{setcommentdescr(e.target.value)}} value={commentdescr} />
        <button className='commentbutton' onClick={handleclick}>send</button>
      </div>
        {isLoading?"loading":data.map(scomment=>(
       <div className='commentdiv my-3'key={scomment.id}>
        <img src={scomment.profilepicture} alt="" className='profile mt-1 commentp' />
        <div className='description'>
          <span className='userName' style={{fontWeight:"bold"}}>{scomment.username}</span>
          <p className='commentDescription'>{scomment.comentdescr}</p>


        </div>
       </div>
      )
        
      )}
    </div>
  )
}

export default Comments