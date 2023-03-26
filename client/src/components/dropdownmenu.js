import { Link } from "react-router-dom"
import profileimg from "../pro.jpg";
import edit from '../edit.png';
import logout from "../log-out.png";
import help from "../help.png";
import inbox from "../inbox.png";
import user1 from "../user.png"
import settings from "../setting.png"
import '../dropdownmenu.css';
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
        }).then((result)=>{console.log(result);setProfile(result.data.user)}).catch((err)=>{console.log(err,12)});
  },[])
    const [open, setOpen] = useState(false);

    let menuRef = useRef();
  
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
          console.log(menuRef.current);
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
          <img src={profile.picture}></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <h3>Client Name<br/><span>Best Podcaster</span></h3>
          <ul>
            <DropdownItem img = {profile.picture} lien={"/profile"} text = {"My Profile"}/>
            <DropdownItem img = {edit} lien={"/profile"}  text = {"Edit Profile"}/>
           
            <DropdownItem img = {settings}  lien={"/profile"} text = {"Settings"}/>
            <DropdownItem img = {help} lien={"/profile"} text = {"Helps"}/>
            <DropdownItem img = {logout} lien={"/profile"}  text = {"Logout"} />
            <button onClick={handleLogout}>Logout</button>
            
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