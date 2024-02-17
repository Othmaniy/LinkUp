import React, { useContext } from 'react'
import { AuthContext } from '../context/authcontext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import getRequest from '../axios/axios';
import "./friend.css"
import { Link } from 'react-router-dom';
function Friend({suser}) {
const userid = suser.user_id;
const {currentUser} = useContext(AuthContext);
console.log(userid);
console.log(typeof(userid));

const { isLoading:relaisloading, error:relerror, data:relationdata } = useQuery(["relationship",userid], () =>
        
getRequest.get(`/relationships?followeduser=`+userid).then((res)=>{
 console.log("Response from friends relaationship API:", res.data);
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

const mutation = useMutation((follow)=>{
  console.log(follow);
  if(follow){
    return getRequest.delete("/relationships?userid="+ userid)
  }
  return getRequest.post("/relationships",{userid:userid})

  
},{
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries(["relationship"])
  },
})
const handlefollow =()=>{
  mutation.mutate(relationdata?.includes(currentUser.user_id))
  }
  const queryClient=useQueryClient();
  console.log(relationdata);
  

  return (
    <div className='friends5 shadow mb-4'>
    
    {relaisloading?"loading":<div>

      <Link to={`/profile/${suser.user_id}`}><div className='use mt-2'>
              <img src= {"/upload/"+suser.profilepicture} alt=""  className='profile friendimg'/>
              <span className='username ml-3'>{suser.name + " "+suser.lastname}</span>
            </div></Link>
    
            <span className='locationt'>{suser.location}</span>
            <div className='buttons mt-2'>
              <button className='buttonn1 b1 mx-2' onClick={handlefollow}>{relationdata?.includes(currentUser.user_id)?"Unfollow":"follow"} </button>
              {/* <button className='button2 b2'>Remove</button> */}
            </div>
    </div> }
        
    </div>
  )
}

export default Friend