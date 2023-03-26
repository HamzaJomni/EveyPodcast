import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import AudioPlayer from './react-audio-player';


function Podcast_detail() {
    const { podcast_id } = useParams(); // variable pour stocker l'id cliqué
    const [Tracks, setTracks] = useState([]);



    const [podcastID, setpodcastID] = useState([]); // contient les donnée du podcast
    useEffect(() => {
      axios.get(`http://localhost:5000/podcast/podcast/${podcast_id}`)
        .then(response => {
            setpodcastID(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [podcast_id]);
     
    useEffect(() => {
      axios.get('http://localhost:5000/track/tracks') // `${host}track/tracks`
        .then(response => {
          setTracks(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []); 

    const tracksData = Tracks.filter(track => track.podcastId === parseInt(podcast_id)).map(track => {
      return {
        title: track.title,
        author: podcastID.author,
        trackUrl: track.trackUrl,
        id: track.id
      };
    });
    
    return (
      <div>
        <Header/>
        <div className='links_id'>
          <img  src='/hero_id.jpg' id='hero_id' />
          <Link to='/Podcasts'>Podcasts </Link>
          <span>{podcastID.title}</span>
        </div>

        <section className='podcast_id_container'>   
          <img src={podcastID.imageUrl} id='image_id' />
          <div className='podcast_id'>
              <div id='title_id'>{podcastID.title}</div>
              <div id='author_id'>{podcastID.author}</div>
              <div id='description_id'>{podcastID.description}</div>
              <img  src='/play1.jpg'  id='play_id' />
              
              <p id='share_id'>Share this podcast</p>
              <span className='reseau_sociaux_id'>
                <img src='/fb.jpg' id='fb_id'/> <img src='/twitter.jpg' id='twitter_id'/>
              </span>
          </div>              
        </section>

        <section className='tracks_section'>
          <h3>All Tracks</h3>
          <Link to={`/newTrack/${podcast_id}`}>Import track</Link>
          <div>
            {Tracks.filter(track => track.podcastId === parseInt(podcast_id)).map(track => {
              const date = new Date(track.created_at);
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              const formattedDate = date.toLocaleDateString('en-US', options);
              return (
                <div className='track' key={track.id}>
                    <div className='theline'></div>

                    <div className="track_container">
                      <span>
                        <img src='/micro1.jpg' id='mic_icon_track'/>
                      </span> 

                      <span className='track_info'>
                        <h4>{track.title}</h4>
                        <p>{formattedDate}</p>
                        <p>{track.description}</p>
                      </span>

                      <span>
                        
                          <img src='/play1.jpg' id='play_track'/>
                        <audio controls>
                          <source src={track.trackUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        
                        {
                          /*<AudioPlayer tracks={tracksData} />*/

                        }
                      </span> 
                    </div>
                </div>
              );
            })}
          </div>

        </section>
      </div>
    );
}

export default Podcast_detail;  