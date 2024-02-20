import React, { useContext, useState, useEffect } from 'react';
import "./stories.css";
import { AuthContext } from '../context/authcontext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { MdClose } from "react-icons/md";
import { FcPrevious, FcNext } from "react-icons/fc";
import moment from 'moment';
import getRequest from '../axios/axios';
import { IoIosCloseCircle } from "react-icons/io";
import Home from '../../pages/Home/Home';

function Storiess() {
  const { currentUser } = useContext(AuthContext);
  const [storyFile, setStoryFile] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [isPostsVisible, setIsPostsVisible] = useState(true);
  const [storiesData, setStoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", storyFile);
      const res = await getRequest.post("/upload/stories", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation((newStory) => {
    return getRequest.post("/stories", newStory);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["story"]);
    }
  });

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["story"], () => getRequest.get("/stories").then((res) => res.data)
    .catch(error => console.log('Error response data:', error.response.data))
    .catch(error => console.log(error))
  );

  useEffect(() => {
    if (!isLoading && data) {
      setStoriesData(data);
      setLoading(false);
    }
  }, [isLoading, data]);

  useEffect(() => {
    console.log("Active Story Index: ", activeStoryIndex);
    console.log("Stories Data: ", storiesData);
  }, [activeStoryIndex, storiesData]);

  const handleStory = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (storyFile) imageUrl = await upload();
    mutation.mutate({ storyimage: imageUrl });
    setStoryFile(null);
  };

  const handleStoryClick = (index) => {
    setActiveStoryIndex(index);
    setIsPostsVisible(false); // Hide posts when a story is clicked
  
  };

  const handlePrevClick = () => {
    setActiveStoryIndex(activeStoryIndex === 0 ? storiesData.length - 1 : activeStoryIndex - 1);
  };

  const handleNextClick = () => {
    setActiveStoryIndex(activeStoryIndex === storiesData.length - 1 ? 0 : activeStoryIndex + 1);
  };

  const handleClose = () => {
    setActiveStoryIndex(null);
    setIsPostsVisible(true); // Show posts when closing the active story
  };

  return (
    <>
      <div className='containerrr'>
        {isPostsVisible && ( 
          <>
            <div className="content">
              <img className='simage' src={"/upload/"+currentUser.profilepicture} alt="" />
              <input type="file" id='storyfile' style={{display:"none"}} onChange={(e)=>{setStoryFile(e.target.files[0])}} />
              <label htmlFor="storyfile">
                <span className='storysubmit'>+</span>
              </label>
              
          
             
            </div>
            
            {loading ? "loading" : storiesData.map((story, index) => (
              <div className="content" key={index} onClick={() => handleStoryClick(index)}>
                <img src={"/upload/" + story.storyimage} alt="storyimage" />
              </div>
            ))}
          </>
        )}
      </div>
      {activeStoryIndex !== null && (
        <div className="full active" >
          <div className="contentfull">
            <div className="close" onClick={handleClose}>
              <MdClose className='closei' />
            </div>
            <div className="previous" onClick={handlePrevClick}>
              <FcPrevious className='previousi' />
            </div>
            <div className="fullimage">
              <img src={"/upload/"+storiesData[activeStoryIndex].storyimage} alt="" className='fullstoryimage' />
            </div>
            <div className="next" onClick={handleNextClick}>
              <FcNext className='nexti' />
            </div>
          </div>
          <div className="description">
            <span>{storiesData[activeStoryIndex].name}</span>
          </div>
        </div>
      )}

{storyFile && <div className='spreviewdiv'>
                <img className='storiespreview' src={URL.createObjectURL(storyFile)} alt="" /> 
               <button className='ssubbu' onClick={handleStory}>sub</button>
              
              </div>  }
    </>
  );
}

export default Storiess;
