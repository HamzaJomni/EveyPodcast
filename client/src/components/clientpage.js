//import dotenv from 'dotenv';
//dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import Slider from "./slider";
import { Link } from "react-router-dom"
import Navbarclient from './navbarclient';


// Accès aux variables d'environnement définies dans le fichier .env
//const host = process.env.host;  || 'http://localhost:5000/'

function Clientpage() {
  const [Podcasts, setPodcasts] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts') // `${host}podcast/podcasts`
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  
    return (
    <div>
        <Navbarclient/>
        

<section className='topic_section'>
<h2>Best podcast topics</h2>
  <div className="topic_links">
    <Link to='/allPodcasts/News & Politics'>News & Politics</Link>
    <Link to='/allPodcasts/Economy and Business'>Economy and Business</Link>
    <Link to='/allPodcasts/Technologie'>Technologie</Link>
    <Link to='/allPodcasts/Start-up'>Start-up</Link> 
    <Link to='/allPodcasts/Government'>Government</Link>
    <Link to='/allPodcasts/History'>History</Link>
    <Link to='/allPodcasts/Educational'>Educational</Link>
    <Link to='/allPodcasts/Sport And Leisur'>Sport And Leisur</Link>
    <Link to='/allPodcasts/History'>Health And Wellness</Link>
    <Link to='/allPodcasts/Companies And Tunisia'>Companies And Tunisia</Link>
    <Link to='/allPodcasts/Arts & Culture'>Arts & Culture</Link>
    <Link to='/allPodcasts/Tv & Films'>Tv & Films</Link>
    <Link to='/allPodcasts/Society & Culture'>Society & Culture</Link>
    <Link to='/allPodcasts/Religion & Spirituality'>Religion & Spirituality</Link>
    <Link to='/allPodcasts/Other'>Other</Link>
    <Link to='/imageUploader'>test</Link>
  </div>   
</section>

<section className='podcast_section'>

  <h2>News & Politics</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'News & Politics').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

  <h2>Economy and Business</h2>
  <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Economy and Business').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>Technology</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Technologie').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
          <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>Start-up</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Start-up').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>Government</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Government').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>History</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'History').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>
  
</section>

      <Footer/>
    </div>
   
    )
}
export default Clientpage;