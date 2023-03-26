import Header from "./header";
<<<<<<< Updated upstream
import React, { useState ,useEffect} from "react";
=======
import Footer from "./footer";
import Slider from "./slider";
import { Link } from "react-router-dom"
import Navbarclient from './navbarclient';
>>>>>>> Stashed changes

import Axios from "axios";
import Main_caracteristique from "./main_caracteristique";
import '../podcast.css'

<<<<<<< Updated upstream
=======
  

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts')
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
>>>>>>> Stashed changes

export default function Podcasts() {
  const [podcastdetails,setPodcastdetails]=useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3003/api/get").then((response)=>{
      setPodcastdetails(response.data)
    },[]);

  })
  return (
<<<<<<< Updated upstream
    <>
    <Header/>
    <h1>liste des podcast</h1>
    {podcastdetails.map((val)=>{
      return <ul><li> <h2>podcast name:{val.title} *** podcast description:{val.description}</h2></li></ul>
    })}
=======
    <div>
  
     <Header /> 
     
      <Slider/>
>>>>>>> Stashed changes

    <div className="flex-box">
      <div className="card">
        <div class="img"></div>
        <p className="title"> podcast title</p>
        <a href="#">View details</a>
      </div>
      <div className="card">
        <div class="img"></div>
        <p className="title"> podcast title</p>
        <a href="#">View details</a>
      </div>
      <div className="card">
        <div class="img"></div>
        <p className="title"> podcast title</p>
        <a href="#">View details</a>
      </div>
      <div className="card">
        <div class="img"></div>
        <p className="title"> podcast title</p>
        <a href="#">View details</a>
      </div>
    </div>
    
    </>
  );
}