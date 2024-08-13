import React from 'react'
import "./leftbarprops.css"

function Leftbarprops({image,title}) {
  return (
    <div>
        <div className='items my-5'>
            <img src={image} alt="" className='icons'/>
            <span className='fs-5'>{title}</span>
        </div>
    </div>
  )
}

export default Leftbarprops