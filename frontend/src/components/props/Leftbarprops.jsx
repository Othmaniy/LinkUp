import React from 'react'
import "./leftbarprops.css"

function Leftbarprops({image,title}) {
  return (
    <div>
        <div className='items mb-2'>
            <img src={image} alt="" className='icons'/>
            <span>{title}</span>
        </div>
    </div>
  )
}

export default Leftbarprops