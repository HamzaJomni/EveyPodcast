import { Link } from "react-router-dom"
import Dropdownmenu from "./dropdownmenu";
import SearchBar from './search_bar';
import axios from 'axios';
import React ,{useEffect,useState}from "react";


export default function Navbarclient() {


  
    return (
    <div>
    <header>
     <div>  
        <nav className="navbar"> 

            <span className="logo">
                <Link to='/podcasts'>
                    <img src='/logo.png' />
                </Link>
            </span>

            <span className="links">
                <Link to='/'>Home</Link>
                <Link to='/podcasts'>Podcasts</Link>
                <Link to='/Contact-Us'>Contact-Us</Link>
                
                <SearchBar/> 
                
                <Dropdownmenu/>
            </span>   
        </nav> 
         
    </div>  

    </header>    
    </div>
    )
}