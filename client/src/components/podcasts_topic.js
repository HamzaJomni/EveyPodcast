import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";

function Podcasts_topic(props) {
  const { topic } = useParams();
  const [topics, setTopics] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  let topicc = null; // variable pour stocker le topic
  const limit = 3; // nombre de podcasts à afficher par page
      // Effet qui se déclenche chaque fois que `topic` change
  useEffect(() => {
    setTopics([]); // Réinitialisation du tableau `topics`
    setPage(1); // Réinitialisation de la page à 1
    setHasMore(true); // Réinitialisation de `hasMore` à true
  }, [topic]);




  useEffect(() => {
     // Reset topics array to empty when topic changes
    
    setLoading(true);
   // setTopics([]);
    axios.get(`http://localhost:5000/podcast/data?limit=${limit}&offset=${(page - 1) * limit+1}&topic=${topic}`)
      .then(response => {
        console.log(response);
        setTopics((prev) => {
          return [...prev,...new Set([ ...response.data.data])];
         // return setTopics([...new Set([...response.data.data])]);
        });
        //console.log(response.data.data.length,"yaaaaaaa");
        setHasMore(response.data.data.length > 0);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [page, topic]);
  console.log(topics)

  const observer = useRef();
  const lastTopicRef = useCallback(node => {
   // console.log(loading,"is it loading ") // elle affiche false 
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
       // console.log("i'm changing the params")
       // console.log(page,"c'est la page ")
        setPage(prevPage => prevPage + 1);
       
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  //console.log(loading,"loadingggg");
  //console.log(hasMore,"hasmoreeeeee");
  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
  };

  const h1Style = {
    textAlign: 'center',
    marginLeft:'30px'
  };
  return (
    <div>
      <Header />
      <section className='topic_section'>
        <h2>Best podcast topics</h2>
        <span className="topic_links">
                <Link to='/allPodcasts/News and Politics'>News and Politics</Link>
                <Link to='/allPodcasts/Economy and Business'>Economy and Business</Link>
                <Link to='/allPodcasts/Technologie'>Technology</Link>
                <Link to='/allPodcasts/Start-up'>Start-up</Link> 
                <Link to='/allPodcasts/Government'>Government</Link>
                <Link to='/allPodcasts/History'>History</Link>
                <Link to='/allPodcasts/Educational'>Educational</Link>
                <Link to='/allPodcasts/Sport And Leisur'>Sport And Leisur</Link>
                <Link to='/allPodcasts/Health And Wellness'>Health And Wellness</Link>
                <Link to='/allPodcasts/Companies And Tunisia'>Companies And Tunisia</Link>
                <Link to='/allPodcasts/Arts and Culture'>Arts and Culture</Link>
                <Link to='/allPodcasts/Tv and Films'>Tv and Films</Link>
                <Link to='/allPodcasts/Society and Culture'>Society and Culture</Link>
                <Link to='/allPodcasts/Religion and Spirituality'>Religion and Spirituality</Link>
                <Link to='/allPodcasts/Other'>Other</Link>
        </span>
      </section>

      <h2 id='podcast_topic_container_h2' >{topic}</h2>
      
      <section className='podcast_topic_container'>


        {topics.map((topic, index) => {
          if (topics.length === index + 1) {
            return (
              <div className='podcast_topic' ref={lastTopicRef} >
                
                <Link to={`/podcast/${topic.id}`}>
                  <img src={topic.imageUrl} alt={topic.title} />
                  <h4>{topic.title}</h4>
                </Link>
                <p>{topic.author}</p>
              </div>
            );
          } else {
            return (
              
              <div className='podcast_topic'>
                <Link to={`/podcast/${topic.id}`}>
                  <img src={topic.imageUrl}/>
                  <h4>{topic.title}</h4>
                </Link>
                <p>{topic.author}</p>
              </div>
            );
          }
        })}
        {loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
        {!hasMore && (
          <div style={divStyle} className="no-more-topics">
            <h1 style={h1Style}>No more podcasts</h1>
          </div>
        )}
      </section>
    </div>
  );
}

export default Podcasts_topic;
