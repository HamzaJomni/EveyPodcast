import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import Slider from "./slider";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header/>
      <Slider/>

      <h1>Liste des podcasts</h1>
      <ul>

        {podcasts.map(podcast => (

          <li key={podcast.id}> 
            <h2>{podcast.title}</h2>
            <p>{podcast.description}</p>
            <p>Durée : {podcast.duration} minutes</p>
          </li>

        ))}

      </ul>

      <section className='podcast_section'>
        <h2>New & Featured</h2>
        <div className='podcast_container'>

          <div className='podcast'>
            {podcasts.map(podcast => (

              <div key={podcast.id}> 
                <img src='/podcast_image1.jpeg' />
                <h4>{podcast.title}</h4>
                <p>Author's name</p>  
              </div>
              
            ))}
          </div>

          <div className='podcast'>
            <img src='/podcast_image1.jpeg' />
            <h4>Title</h4>
            <p>author name</p>
          </div>

          <div className='podcast'>
            <img src='/podcast_image1.jpeg' />
            <h4>Title</h4>
            <p>author name</p>
          </div>

          <div className='podcast'>
            <img src='/podcast_image1.jpeg' />
            <h4>Title</h4>
            <p>author name</p>
          </div>

          <div className='podcast'>
            <img src='/podcast_image1.jpeg' />
            <h4>Title</h4>
            <p>author name</p>
          </div>

          <div className='podcast'>
            <img src='/podcast_image1.jpeg' />
            <h4>Title</h4>
            <p>author name</p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Podcasts;
