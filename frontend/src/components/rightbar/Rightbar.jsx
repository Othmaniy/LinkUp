 import React from 'react'
 import "./rightbar.css"
 import user from "../../assets/Final.jpg.jpg"

 function Rightbar() {
   return (
     <div className='rightbar'>
      <div className='all_right'>
        <div className='frendsWrapper  shadow'>
          <span>suggested for you </span>
          <div className='frendsandButton'>
            <div className='use'>
              <img src={user} alt=""  className='profile'/>
              <span className='username'>ousman muhammed</span>
            </div>
            <div className='buttons'>
              <button className='buttonn1 b1 mx-2'>Add </button>
              <button className='button2 b2'>Remove</button>
            </div>
          </div>

          <div className='frendsandButton'>
            <div className='use'>
              <img src={user} alt=""  className='profile'/>
              <span className='username'>muhammed ousman</span>
            </div>
            <div className='buttons'>
              <button className='buttonn1 b1 mx-2'>Add </button>
              <button className='button2 b2'>Remove</button>
            </div>
          </div>
          
          

        </div>
        <div className='notifications shadow my-4'>
        <span>recent activities </span>
          <div className='frendsandButton'>
            <div className='use'>
              <img src={user} alt=""  className='profile'/>
              <p className='rightp'> <span className='username'>name</span> updated his profile picture</p>
              <span className='mx-2'> 1 minute ago</span>
            </div>
            {/* <div className='buttons'>
              <button className='buttonn1 b1 mx-2'>Add </button>
              <button className='button2 b2'>Remove</button>
            </div> */}
          </div>
          <div className='frendsandButton'>
            <div className='use'>
              <img src={user} alt=""  className='profile'/>
              <p className='rightp'> <span className='username'>name</span> updated his profile picture</p>
              <span className='mx-2'> 1 minute ago</span>
            </div>
            {/* <div className='buttons'>
              <button className='buttonn1 b1 mx-2'>Add </button>
              <button className='button2 b2'>Remove</button>
            </div> */}
          </div>
            
        </div>

        <div className='frendsWrapper  shadow'>
          <span>online friends </span>
          <div className='frendsandButton'>
            <div className='use'>
            <div className='online' />
              <img src={user} alt=""  className='profile'/>
              <span className='username'>ousman muhammed</span>
            </div>
            
          </div>

          <div className='frendsandButton'>
            <div className='use'>
              <div className='online' />
              <img src={user} alt=""  className='profile'/>
              <span className='username'>muhammed ousman</span>
            </div>
            
          </div>
          <div className='frendsandButton'>
            <div className='use'>
              <div className='online' />
              <img src={user} alt=""  className='profile'/>
              <span className='username'>muhammed ousman</span>
            </div>
            
          </div>
          <div className='frendsandButton'>
            <div className='use'>
              <div className='online' />
              <img src={user} alt=""  className='profile'/>
              <span className='username'>muhammed ousman</span>
            </div>
            
          </div>
          <div className='frendsandButton'>
            <div className='use'>
              <div className='online' />
              <img src={user} alt=""  className='profile'/>
              <span className='username'>muhammed ousman</span>
            </div>
            
          </div>
          <div className='frendsandButton'>
            <div className='use'>
              <div className='online' />
              <img src={user} alt=""  className='profile'/>
              <span className='username'>muhammed ousman</span>
            </div>
            
          </div>
          
          

        </div>

      </div>

     </div>
   )
 }
 
 export default Rightbar