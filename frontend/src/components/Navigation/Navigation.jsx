import React, { useContext } from 'react'
import "./nav.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import userImage from '../../assets/Final.jpg.jpg';
import { AuthContext } from '../context/authcontext';
import { Link } from 'react-router-dom';
function Navigation() {
  const {currentUser} = useContext(AuthContext)
  return (
    <>
    <div className='navbar'>
    <div className='leftl'>
        <span>ousmanbook</span>
        <HomeOutlinedIcon />
        <Link to="/friends"><PersonIcon /></Link>
        
        <AppsOutlinedIcon/>
        <div className='search' style={{display:"flex"}}>
          {/* <SearchIcon className='sic' /> */}
          <input className='in1' type="text" placeholder='search'/>
        </div>
      </div>
      
      <div className='rightnav'>
        
        <EmailIcon />
        <NotificationsIcon />
        <div className='userp'>
        <img src={"/upload/"+currentUser.profilepicture} className='profile' />
        <Link  to ={`/profile/${currentUser.user_id}`}>
        <span>
          {currentUser.name}
        </span></Link>
        
        </div>
        
      </div>
    </div>
      
    </>
  )
}

export default Navigation