import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import Slider from "./slider";
import { Link } from "react-router-dom"

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [News, setNews] = useState([]);
  const [Economy, setEconomy] = useState([]);
  const [technologies, setTechnologie] = useState([]);
  const [Startup, setStartup] = useState([]);
  const [Government, setGovernment] = useState([]);
  const [History, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts')
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts/News & Politics')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts/Economy and Business')
      .then(response => {
        setEconomy(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts/technologie')
      .then(response => {
        setTechnologie(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts/Start-up')
      .then(response => {
        setStartup(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts/Government')
      .then(response => {
        setGovernment(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts/History')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  

  return (
    <div>
      <Header/>
      <Slider/>

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
        </div>   
      </section>

      <section className='podcast_section'>

        <h2>News & Politics</h2>
          <div className='podcast_container'>
              {News.map(news => (
                <div className='podcast' key={news.id}> 
                  <Link to={`/podcast/${news.id}`}><img src='/podcast_image1.jpeg' />
                  <h4>{news.title}</h4></Link>
                  <p>{news.author}</p>  
                </div>  
              ))}
          </div>

        <h2>Economy and Business</h2>
          <div className='podcast_container'>
              {Economy.map(economy => (
                <div className='podcast' key={economy.id}> 
                  <Link to={`/podcast/${economy.id}`}><img src='/podcast_image1.jpeg' />
                  <h4>{economy.title}</h4></Link>
                  <p>{economy.author}</p>  
                </div>  
              ))}
          </div>

          <h2>Technology</h2>
          <div className='podcast_container'>
              {technologies.map(technologie => (
                <div className='podcast' key={technologie.id}> 
                  <Link to={`/podcast/${technologie.id}`}><img src='/podcast_image1.jpeg' />
                  <h4>{technologie.title}</h4></Link>
                  <p>{technologie.author}</p>  
                </div>  
              ))}
          </div>

          <h2>Start-up</h2>
          <div className='podcast_container'>
              {Startup.map(startup => (
                <div className='podcast' key={startup.id}> 
                  <Link to={`/podcast/${startup.id}`}><img src='/podcast_image1.jpeg' />
                  <h4>{startup.title}</h4></Link>
                  <p>{startup.author}</p>  
                </div>  
              ))}
          </div>

          <h2>Government</h2>
          <div className='podcast_container'>
              {Government.map(government => (
                <div className='podcast' key={government.id}> 
                  <Link to={`/podcast/${government.id}`}><img src='/podcast_image1.jpeg' />
                  <h4>{government.title}</h4></Link>
                  <p>{government.author}</p>  
                </div>  
              ))}
          </div>

          <h2>History</h2>
          <div className='podcast_container'>
              {History.map(history => (
                <div className='podcast' key={history.id}> 
                  <Link to={`/podcast/${history.id}`}><img src='/podcast_image1.jpeg' />
                  <h4>{history.title}</h4></Link>
                  <p>{history.author}</p>  
                </div>  
              ))}
          </div>
        
      </section>

      <Footer/>
    </div>
  );
}

export default Podcasts;
