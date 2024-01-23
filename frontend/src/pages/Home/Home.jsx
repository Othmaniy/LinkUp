import React from 'react'
import "./Home.css"
import Stories from '../../components/Stories/Stories'
import Posts from '../../components/posts/posts'
import Share from '../../components/share/Share'
// import Share from '../../components/share/share'

function Home() {
  return (
    <div className='home'>
      <Stories />
      <Share />
      <Posts />
    </div>
  )
}

export default Home