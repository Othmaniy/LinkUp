import React from 'react'
import "./posts.css"
import Post from '../post/Post'
// import Share from '../share/share'
import getRequest from '../axios/axios'
import axios from "axios"
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

function Posts({userid}) {
  const navigate = useNavigate();
    const { isLoading, error, data } = useQuery(["post"], () =>

            getRequest.get("/posts?userid="+userid).then((res)=>{
            console.log("Response from API:", res.data);
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
          //  .catch(error=>{
          //   console.log(error);
          //  })
         
  )
 
    // const posts =[
    //     {
    //         id:1,
    //         name:"ousman",
    //         userid:3,
    //         image:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg",
    //         profilepic:"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    //        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quo quod mollitia fugiat voluptatem exercitationem dolorem rem quasi sed temporibus."

    //     },
    //     {
    //         id:2,
    //         name:"ousman",
    //         userid:1,
    //         image:"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
    //         profilepic:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg",
    //        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quo quod mollitia fugiat voluptatem exercitationem dolorem rem quasi sed temporibus."

    //     },
    //     {
    //         id:3,
    //         name:"ousman",
    //         userid:4,
    //         profilepic:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg",
    //        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quo quod mollitia fugiat voluptatem exercitationem dolorem rem quasi sed temporibus."

    //     }
    // ]
    console.log(data); 
    if(error){
      console.log(error.response.data.sqlMessage);
    }
  return (
    <div>
       
        <div className='posts'>
        { isLoading?"loading" :data.map((post)=>(
            <Post post={post} key={post.id} />
        ))}
    </div>
    </div>
  )
}

export default Posts