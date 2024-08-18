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
     <div className='nav'>
      <div className="leftnavigation">
        <Link to={`profile/${currentUser.user_id}`}> <img className='profile' src={"/upload/"+currentUser.profilepicture} alt="" /></Link>

        <Link to={"/"}> <HomeOutlinedIcon className='icons' /></Link>
       
       

        <Link to={"/friendss"} >
        <PersonIcon className='icons' />
        </Link>
        
      </div>
      <div className='rightnavigation'>
      <span>{currentUser.name}</span>
      <NotificationsIcon className='icons' />
      
      </div>
     </div>
      
    </>
  )
}

export default Navigation