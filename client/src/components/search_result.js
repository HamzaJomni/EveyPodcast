import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from "./header";
import { Link } from "react-router-dom"

function SearchResult() {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/podcast/search/${searchTerm}`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchTerm]);

  return (
    <>
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
          <h2 id='the_result'>The Result :</h2>
         <div className='podcast_topic_container'>
            {results.map(result => (
              <div className='podcast_topic' key={result.id}>
                <Link to={`/podcast/${result.id}`}>
                  <img src={result.imageUrl} />
                  <h4>{result.title}</h4>
                </Link>
                <p>{result.author}</p>
              </div>
            ))}
          </div>
    </>
  );
}

export default SearchResult;
