//import dotenv from 'dotenv';
//dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import Slider from "./slider";
import { Link } from "react-router-dom"
import Navbarclient from './navbarclient';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

// Accès aux variables d'environnement définies dans le fichier .env
//const host = process.env.host;  || 'http://localhost:5000/'

function Podcasts() {
  const [Podcasts, setPodcasts] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);
  const [dateFilter, setDateFilter] = useState('');
const [themeFilter, setThemeFilter] = useState('');
const [results, setResults] = useState([]);

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const result = await axios.get('http://localhost:5000/users/user/profile', {
          withCredentials: true,
        });
        if (result.data.success) {
          setProfile(result.data.user);
        } else {
          setError('Failed to get profile');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to get profile');
      }
    }
    fetchUserProfile();
  }, []);

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };
  
  const handleThemeFilterChange = (event) => {
    setThemeFilter(event.target.value);
  };
  
  const handleSearch = () => {
    axios.get(`http://localhost:5000/podcast/search/${dateFilter}/${themeFilter}`)
      .then((response) => {
        setResults(response.data);
        console.log(response.data)
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      {profile ? <Navbarclient/> : <Header/>}
      <Slider/>


      <section className='podcast_section'>
        


      <div className='container_for_seeMore'>
      <Link to='/allPodcasts/News and Politics'><h2>News and Politics</h2></Link>
      <Link to='/allPodcasts/News and Politics'>See More</Link>
      </div>
          <div className='podcast_container'>
            {Podcasts.sort((b, a) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'News and Politics').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                  <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>

      <section className='topic_section'>
        <h2>Best podcast topics</h2>
          <div className="topic_links">
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
            {/*<Link to='/test'>Test</Link>*/}

    <FontAwesomeIcon icon={faList}  style={{marginLeft:"10px",marginTop:"20px",fontSize:"25px",cursor:'pointer'}} onClick={toggleFilter} />
         
         
         {isFilterVisible &&
       <div className="filter-box">
       <div className="filter-group">
         <p className="filter-title"> Filter By Date</p>
         <div className="radio-buttons">
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="last_day" checked={dateFilter === 'last_day'} onChange={handleDateFilterChange} />
             <span className="radio-text">Last Day</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="one_week" checked={dateFilter === 'one_week'} onChange={handleDateFilterChange} />
             <span className="radio-text"> One Week ago</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="one_month" checked={dateFilter === 'one_month'} onChange={handleDateFilterChange} />
             <span className="radio-text">One Month ago</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="one_year" checked={dateFilter === 'one_year'} onChange={handleDateFilterChange} />
             <span className="radio-text">One Year ago</span>
           </label>
         </div>
       </div>
       <div className="filter-group">
         <p className="filter-title">Filter by Topic</p>
         <div className="radio-buttons-topic">
         <label className="radio-label">
            <input type="radio" name="themeFilter" value="News and Politics" checked={themeFilter === 'News and Politics'} onChange={handleThemeFilterChange} />
            <span className="radio-text">News and Politics</span>
            </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Economy and Business" checked={themeFilter === 'Economy and Business'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Economy and Business</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Technologie" checked={themeFilter === 'Technologie'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Technology</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Start-up" checked={themeFilter === 'Start-up'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Start-up</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="History" checked={themeFilter === 'History'} onChange={handleThemeFilterChange} />
             <span className="radio-text">History</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Government" checked={themeFilter === 'Government'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Government</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Educational" checked={themeFilter === 'Educational'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Educational</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Arts and Culture" checked={themeFilter === 'Arts and Culture'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Arts and Culture</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Health And Wellness" checked={themeFilter === 'Health And Wellness'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Health And Wellness</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Companies And Tunisia" checked={themeFilter === 'Companies And Tunisia'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Companies And Tunisia</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Tv and Films" checked={themeFilter === 'Tv and Films'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Tv and Films</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Society and Culture" checked={themeFilter === 'Society and Culture'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Society and Culture</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Religion and Spirituality" checked={themeFilter === 'Religion and Spirituality'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Religion and Spirituality</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Other" checked={themeFilter === 'Other'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Other</span>
           </label>
           
         </div>
        </div>
        
          <button id="btnSearch" onClick={handleSearch}>Search</button>

        </div>
        }

      </div>  
    </section>



    {results.length > 0 ? (
        <>
          <h2 id='result_recherche_avancée'>The Result :</h2>
          <div className='podcast_container_result'>
            {results.map(result => (
              <div className='podcast' key={result.id}>
                <Link to={`/podcast/${result.id}`}>
                  <img src={result.imageUrl} />
                  <h4>{result.title}</h4>
                </Link>
                <p>{result.author}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>

     
      <div className='container_for_seeMore'>
      <Link to='/allPodcasts/Economy and Business'><h2>Economy and Business</h2></Link>
      <Link to='/allPodcasts/Economy and Business'>See More</Link>
      </div>
        <div className='podcast_container'>
            {Podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'Economy and Business').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                  <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>

          <div className='container_for_seeMore'>
          <Link to='/allPodcasts/Technologie'><h2>Technology</h2></Link>
            <Link to='/allPodcasts/Technologie'>See More</Link>
          </div>    
          
          <div className='podcast_container'>
            {Podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'Technologie').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>

          <div className='container_for_seeMore'>
          <Link to='/allPodcasts/Start-up'><h2>Start-up</h2></Link>
            <Link to='/allPodcasts/Start-up'>See More</Link>
          </div>    
          
          <div className='podcast_container'>
            {Podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'Start-up').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                  <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>

          <div className='container_for_seeMore'>
          <Link to='/allPodcasts/Government'><h2>Government</h2></Link>
            <Link to='/allPodcasts/Government'>See More</Link>
          </div>    
          
          <div className='podcast_container'>
            {Podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'Government').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                  <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>

          <div className='container_for_seeMore'>
          <Link to='/allPodcasts/History'><h2>History</h2></Link>
            <Link to='/allPodcasts/History'>See More</Link>
          </div>    
          
          <div className='podcast_container'>
            {Podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'History').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                  <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>

          <div className='container_for_seeMore'>
          <Link to='/allPodcasts/Health And Wellness'><h2>Health And Wellness</h2></Link>
            <Link to='/allPodcasts/Health And Wellness'>See More</Link>
          </div>    
          
          <div className='podcast_container'>
            {Podcasts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).filter(podcast => podcast.topic === 'Health And Wellness').slice(0, 6).map(podcast => (
              <div className='podcast' key={podcast.id}> 
                <Link to={`/podcast/${podcast.id}`}>
                  <img src={podcast.imageUrl} />
                  <h4>{podcast.title}</h4>
                </Link>
                <p>{podcast.author}</p>  
              </div>  
            ))}
          </div>
        
        </>
      )}
      </section>

      <Footer/>
    </div>
  );
}

export default Podcasts;
