import { Link } from "react-router-dom"
import axios from "axios";

import React from "react";
import SearchBar from "./search_bar";

export default function NavbarAdmin() {
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
    return (
    <div>
    <header>
     <div>  
        <nav className="navbar">   
            <span className="logo"><img src='/logo.png' /></span>
            <span className="links">
            
                <Link to='/adminDashboard'>Dashbord</Link>
                <Link to='/userDashboard'>User Dashboard</Link>
                <Link to='/reports'>Reports</Link>
               
                <Link id="signupbutton" style={{marginLeft:"700px"}} onClick={handleLogout}>Logout</Link>
                
            </span>   
        </nav> 
         
    </div>  

    </header>    
    </div>
    )
}