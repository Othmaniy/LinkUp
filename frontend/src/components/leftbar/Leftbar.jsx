import React from 'react'
import "./leftbar.css"
import friend from "../../assets/friends_880594.png"
import group from "../../assets/user-group-296 (2).png"
import marketplace from "../../assets/marketplace_icon_149431.png"
// import videoicon from "../../assets/watch-movie_5930234 (1).png"
import clock from "../../assets/watch (1).png"
import movie from "../../assets/watch-movie_5930234 (1).png"
import user from "../../assets/Final.jpg.jpg"
import Leftbarprops from '../props/Leftbarprops'
import gallery from "../../assets/picture_2659360.png"
import pages from "../../assets/pages.png"
import calender from "../../assets/magician_7613707.png"
import game from "../../assets/game_1673673.png"
import fundraiser from "../../assets/donate_2638024.png"
import tutorials from "../../assets/subscribe_2128421.png"
import video from "../../assets/video_1179069.png"
import message from "../../assets/comments_2190552.png"


function Leftbar() {
  return (
    <div className='leftn'>
      <div className='leftbar'>
        <div className='menu p-2 mx-3'>
          <div className='userp'>
            <img src={user} alt="" className='profile' />
            <span>ousman muhammed</span>
          </div>
          <div className='item'>
            <Leftbarprops
            image={friend}
            title="frends"
            />
            <Leftbarprops
            image={group}
            title="groups"
            />
            <Leftbarprops
            image={marketplace}
            title="marketplace"
            />
            <Leftbarprops
            image={movie}
            title="watch"
            />
            <Leftbarprops
            image={clock}
            title="memories"
            />
           
          </div>
          
        
        </div>
        <hr className='mt-0' />
        <div className='menu px-2 mx-3'>
          <div className='item'>
          <Leftbarprops
            image={gallery}
            title="gallery"
            />
            <Leftbarprops
            image={pages}
            title="pages"
            />
            <Leftbarprops
            image={game}
            title="video game"
            />
            <Leftbarprops
            image={video}
            title="video"
            />
            <Leftbarprops
            image={message}
            title="messages"
            />
          </div>
         

        </div>
        <hr />
        <div className='menu px-2 mx-3'>
          <div className='item'>
          <Leftbarprops
            image={calender}
            title="events"
            />
            <Leftbarprops
            image={fundraiser}
            title="fundraiser"
            />
            <Leftbarprops
            image={tutorials}
            title="tutorials"
            />
            <Leftbarprops
            image={calender}
            title="events"
            />
            <Leftbarprops
            image={fundraiser}
            title="fundraiser"
            />
            <Leftbarprops
            image={tutorials}
            title="tutorials"
            />
            <Leftbarprops
            image={calender}
            title="events"
            />
            <Leftbarprops
            image={fundraiser}
            title="fundraiser"
            />
            <Leftbarprops
            image={tutorials}
            title="tutorials"
            />
          </div>
         

        </div>
        
      </div>
      
      {/* <img src={friend} alt="" />
      <img src={movie} alt="" /> */}
    </div>
  )
}

export default Leftbar