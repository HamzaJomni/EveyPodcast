import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBan} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
function UserBlocked(){

    axios.get('http://localhost:5000/users/logout',{
                withCredentials: true,
              }).then((result)=>{console.log(result)}).catch((err)=>{console.log(err,12)});
       
          
    
    
    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100px', width:'900px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '20px' }}>
          <FontAwesomeIcon icon={faBan} style={{ color: '#cc1e1e', fontSize: '60px' }} />
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Your account was locked... Contact the administrator on Email: evey@live.com</h2>
        </div>
      </div>
    );
}
export default UserBlocked;