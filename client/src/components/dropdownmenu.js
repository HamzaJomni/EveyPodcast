import { Link } from "react-router-dom"
import profileimg from "../lib/img/pro.jpg";
import edit from '../lib/img/edit.png';
import logout from "../lib/img/log-out.png";
import help from "../lib/img/help.png";
import inbox from "../lib/img/inbox.png";
import user1 from "../lib/img/user.png"
import settings from "../lib/img/setting.png"
import '../lib/style/dropdownmenu.css';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';


export default function Dropdownmenu() {
  const handleLogout = async () => {
    try {
      
        axios.get('http://localhost:5000/users/logout',{
            withCredentials: true,
          }).then((result)=>{console.log(result)}).catch((err)=>{console.log(err,12)});
   
      // Redirect the user to the home page after logging out
   window.location.href = 'http://localhost:3000/';
    } catch (err) {
      console.error(err);
    }
  }

  const [profile,setProfile]=useState("");
  useEffect(()=>{
      axios.get('http://localhost:5000/users/user/profile',{
          withCredentials: true,
        }).then((result)=>{/*console.log(result)*/;setProfile(result.data.user)}).catch((err)=>{console.log(err,12)});
  },[])


  
    const [open, setOpen] = useState(false);

    let menuRef = useRef();
  
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
          /*console.log(menuRef.current);*/
        }      
      };
  
      document.addEventListener("mousedown", handler);
      
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });
    return (
    
        <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          {/*<img src={profile.picture}></img>*/}
          <img src='/user1.png' alt="evey_logo" />
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>{profile.name}<br/><span>Personal Space</span></h3>
          <ul>
            <DropdownItem img = '/user1.png' lien={"/profile"} text = {"Profile"}/>
            <DropdownItem img = '/mic.png' lien={`/mypodcast/${profile.id}`}  text = {"My Podcasts"}/>
           
            <DropdownItem img = '/playlist.png'  lien={`/myplaylists/${profile.id}`} text = {"My Playlists"}/>
            <DropdownItem img = '/dashboard3.png' lien={"/dashboard"} text = {"Dashboard"}/>
            <DropdownItem img = {logout} lien={"/profile"}  text = {<button onClick={handleLogout}>Logout</button>} />
            
          </ul>
        </div>
      </div>
         
    
    
    )
}
function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img}></img>
        <Link to={props.lien}>{props.text}</Link>
      </li>
    );
  }