import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";


function Podcast_detail(props) {
    const { podcast_id } = useParams(); // variable pour stocker l'id

    const [podcastID, setpodcastID] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:5000/podcast/podcast/${podcast_id}`)
        .then(response => {
            setpodcastID(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [podcast_id]);// mettre à jour les topics lorsque le sujet dans l'URL change
       
    return (
      <div>
        <Header/>
        <div className='links_id'>
          <img  src='/hero_id.jpg' id='hero_id' />
          <Link to='/Podcasts'>Podcasts  </Link>
          <span>{podcastID.title}</span>
        </div>

        <section className='podcast_id_container'>   
          <img  src='/podcast_image1.jpeg' id='image_id' />
          <div className='podcast_id'>
              <div id='title_id'>{podcastID.title}</div>
              <div id='author_id'>{podcastID.author}</div>
              <div id='description_id'>{podcastID.description}</div>
              <img  src='/play1.jpg'  id='play_id'/>
              <p id='share_id'>Share this podcast</p>
              <span className='reseau_sociaux_id'>
                <img src='/fb.jpg' id='fb_id'/> <img src='/twitter.jpg' id='twitter_id'/>
              </span>
          </div>              
        </section>

        <section className='tracks_section'>
          <h3>All Tracks</h3>
        </section>
      </div>
    );
}

export default Podcast_detail;  