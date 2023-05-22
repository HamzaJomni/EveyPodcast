import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBan} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link } from "react-router-dom"

function UserBlocked(){

    axios.get('http://localhost:5000/users/logout',{
                withCredentials: true,
              }).then((result)=>{console.log(result)}).catch((err)=>{console.log(err,12)});
       
          
    
    
    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '230px', width:'900px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
          <FontAwesomeIcon icon={faBan} style={{ color: '#cc1e1e', fontSize: '60px' }} />
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Your account was locked... Contact the administrator on Email: eveypodcast@gmail.com</h2>
          <h2 id='contactus_account_locked' style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}><Link to='/Contact-Us'>Contact-Us</Link></h2>
        </div>
      </div>
    );
}
export default UserBlocked;