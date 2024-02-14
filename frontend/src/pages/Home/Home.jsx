import React from 'react'
import "./Home.css"
// import Stories from '../../components/Stories/Stories'
import Posts from '../../components/posts/posts'
import Share from '../../components/share/Share'
import Storiess from '../../components/Stories/Storiess'
// import Share from '../../components/share/share'

function Home() {
  return (
    <div className='home'>
    
     
      <Storiess />
      <Share />
      <Posts />
    </div>
  )
}

export default Home