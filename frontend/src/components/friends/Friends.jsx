import React from 'react'
import "./friends.css"
// import { useQuery } from 'react-query'
import getRequest from '../axios/axios'
import { useNavigate } from 'react-router-dom'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Friend from '../friend/Friend'
function Friends() {


// react query to be done here 
 const navigate = useNavigate();
    const { isLoading, error, data } = useQuery(["friends"], () =>

            getRequest.get("/users").then((res)=>{
            console.log("Response from friends api:", res.data);
            return res.data
           })
           .catch(error => {
         
            console.log('Error response data:', error.response.data);
            console.log('Error status:', error.response.status);
            if(error.response.status===401||error.response.status===403){
              navigate("/login")
            }

            // Handle the error as needed
        })
           .catch(error=>{
            console.log(error);
           })
         
  )


  // const queryClient=useQueryClient();

  console.log(data);

  return (
    <>
    
      
        <div className='frendsandButtontyt'>
          <p>abcgagafafa</p>
          
          {/* {isLoading?"loading":data?.map((suser)=>{
            <Friend suser={suser} key={suser.user_id} />
          })} */}
{isLoading?"loading":data.map((suser)=>(
  <Friend suser={suser} key={suser.user_id} />
))}
          


          </div>

        
  
            
    </>
  )
}

export default Friends


