import React, { useState } from 'react'
import "./update.css"
import getRequest from '../axios/axios'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query';
function Update({setOpenupdate,currentdata}) {
  const [textdata,setTextdata] =useState({username:"",location:"",website:""});
  const [cover,setCover] =useState(null);
  const [pp,setPp]=useState(null);
// const [coverpicture,setCoverpictue] =useState(null)
// const [profilepicture,setProfilepictue] =useState(null)
  const handlechange =(e)=>{
    setTextdata({...textdata,[e.target.name]:e.target.value})
  }
   
  //uploading file

  const upload=async(file)=>{
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
  const mutation = useMutation((update)=>{
    return getRequest.put("/users",update)
  },{
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["propile"])
    },
  })

  const handleClick=async(e)=>{
    e.preventDefault();
    let covpicUrl;
    let profpicUrl;
    covpicUrl= cover ? await upload(cover):currentdata.coverpic;
    profpicUrl = pp ? await upload(pp):currentdata.profilepicture ;

    // if(file) imageUrl = await upload();
    mutation.mutate({...textdata,coverpicture:covpicUrl,profilepicture:profpicUrl})
    setOpenupdate(false)
    console.log(covpicUrl);
   console.log(profpicUrl);
  }
   
const queryClient=useQueryClient();
  console.log(textdata);
  return (
    <div className='update'>Update
    <button className='upbutton'  onClick={()=>setOpenupdate(false)}>x</button>
    <form>
      <input type="file" onChange={(e)=>setCover(e.target.files[0])} />
      <input type="file" onChange={(e)=>setPp(e.target.files[0])} />
      <input type="text" name='username' onChange={handlechange} />
      <input type="text" name='location' onChange={handlechange} />
      <input type="text" name='website' onChange={handlechange} />
      <button onClick={handleClick} >update</button>
    </form>
    </div>
  )
}

export default Update