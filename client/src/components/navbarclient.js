import { Link } from "react-router-dom"
import Dropdownmenu from "./dropdownmenu";
import SearchBar from './search_bar';

import React ,{useEffect,useState}from "react";

export default function Navbarclient() {
  
    return (
    <div>
    <header>
     <div>  
        <nav className="navbar">   
            <span className="logo"><img src='/logo.png' /></span>
            <span className="links">
               
                <Link to='/clientpage'>Podcasts</Link>
                <Link to='/Mylibrary'> My library</Link>
                <Link to='/Mylibrary'> Dashbord</Link>
                
                <SearchBar/> 
                
                <Dropdownmenu/>
            </span>   
        </nav> 
         
    </div>  

    </header>    
    </div>
    )
}