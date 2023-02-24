import Header from "./header";
import React, { useState ,useEffect} from "react";

import Axios from "axios";
import Main_caracteristique from "./main_caracteristique";
import '../podcast.css'


export default function Podcasts() {
  const [podcastdetails,setPodcastdetails]=useState([]);
  useEffect(()=>{
    Axios.get("http://localhost:3003/api/get").then((response)=>{
      setPodcastdetails(response.data)
    },[]);

  })
  return (
    <>
    <Header/>
    <h1>liste des podcast</h1>
    {podcastdetails.map((val)=>{
      return <ul><li> <h2>podcast name:{val.title} *** podcast description:{val.description}</h2></li></ul>
    })}

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