import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";


function Podcasts_topic(props) {
  const { topic } = useParams(); // variable pour stocker le topic
  const [topics, settopics] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/podcast/allpodcasts/${topic}`)
      .then(response => {
        settopics(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [topic]); // mettre à jour les topics lorsque le sujet dans l'URL change
  
  let topicc = null; // variable pour stocker le topic
    
    return (
        <div>
          <Header/>

            <section className='topic_section'>
            <h2>Best podcast topics</h2>
                <span className="topic_links">
                <Link to='/allPodcasts/News & Politics'>News & Politics</Link>
                <Link to='/allPodcasts/Economy and Business'>Economy and Business</Link>
                <Link to='/allPodcasts/Technologie'>technologie</Link>
                <Link to='/allPodcasts/Start-up'>Start-up</Link> 
                <Link to='/allPodcasts/Government'>Government</Link>
                <Link to='/allPodcasts/History'>History</Link>
                <Link to='/allPodcasts/Educational'>Educational</Link>
                <Link to='/allPodcasts/Sport And Leisur'>Sport And Leisur</Link>
                <Link to='/allPodcasts/Health And Wellness'>Health And Wellness</Link>
                <Link to='/allPodcasts/Companies And Tunisia'>Companies And Tunisia</Link>
                <Link to='/allPodcasts/Arts & Culture'>Arts & Culture</Link>
                <Link to='/allPodcasts/Tv & Films'>Tv & Films</Link>
                <Link to='/allPodcasts/Society & Culture'>Society & Culture</Link>
                <Link to='/allPodcasts/Religion & Spirituality'>Religion & Spirituality</Link>
                <Link to='/allPodcasts/Other'>Other</Link>
                </span>   
            </section>

            <section className='podcast_topic_section'>

                {topics.map((topic) => {
                // condition pour afficher le topic une seule fois
                if (topicc !== topic.topic) {
                    topicc = topic.topic; // stocker la valeur de podcast.topic dans la variable
                    return <h2 >{topicc}</h2>;
                }

                return null; // si le topic est le même que le précédent, retourne null pour ne pas afficher le topic à nouveau
                })}
        
                    
                    <div className='podcast_topic_container'>
                        {topics.map(topic => (   
                          <div className='podcast_topic' key={topic.id} > 
                            <Link to={`/podcast/${topic.id}`}><img src='/podcast_image1.jpeg' />
                            <h4>{topic.title}</h4></Link>
                            <p>{topic.author}</p>  
                          </div>  
                        ))}
                    </div>   

            </section>
    </div>
  );
}

export default Podcasts_topic;