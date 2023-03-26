import React ,{useEffect,useState}from "react";
import axios from 'axios';
import evey from '../profile.jpg';
import '../log.css';
import Navbarclient from "./navbarclient";
function Profile(){
    const [profile,setProfile]=useState("");
    useEffect(()=>{
        axios.get('http://localhost:5000/users/user/profile',{
            withCredentials: true,
          }).then((result)=>{console.log(result);setProfile(result.data.user)}).catch((err)=>{console.log(err,12)});
    },[])
    return(<div>
      <Navbarclient/>
     <div className='containerprofile'>
       <div className='signup-box'>
        <div className='col-1'>
            <img src={evey} id="profileimage"/>
        </div>
        <div className='col-2'>
            <h2>Account Information</h2>
            <hr/>
                <label>Username</label>
                <div className='input-field' >{profile.name}</div>
                
               
                <label>Password</label>
                <input type="password" value={profile.password} readOnly className='input-field'/> 
                <label>Email Adress</label>
                 <input type="email" value={profile.email} className='input-field'/>
                 <h2>About my account</h2>
                 <hr/>
                 <div className='row'>
                    <input type="radio" />
                    <span> <a href='#'>Delete my account? </a></span> <button id="delete">Delete</button>
                   </div>
                
         
        </div>
       </div>
      </div>
     
    </div>)

}



export default Profile;