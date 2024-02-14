import React, { useState, useEffect } from 'react';
import "./customstories.css"
function CustomStories({ stories }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const goToNextStory = () => {
    setCurrentStoryIndex(prevIndex => (prevIndex + 1) % stories.length);
  };

  return (
    <div className='custom-stories'>
      <div className='thumbnails'>
        {stories.map((story, index) => (
          <img
            key={index}
            src={story.src}
            alt={story.name}
            className={index === currentStoryIndex ? 'active' : ''}
            onClick={() => setCurrentStoryIndex(index)}
          />
        ))}
      </div>
      <div className='main-story'>
        <img
          src={stories[currentStoryIndex].src}
          alt={stories[currentStoryIndex].name}
          className='main-image'
        />
        <button  onClick={goToNextStory} className='next-button' style={{width:"60px"}}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomStories;
