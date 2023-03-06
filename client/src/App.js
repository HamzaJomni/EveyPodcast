import './App.css'
import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Caracteristique from "./components/caracteristique"
import Podcasts from "./components/podcasts"
import Podcasts_topic from "./components/podcasts_topic"
import Podcast_detail from "./components/podcast_detail"
import SearchResult from './components/search_result';


function App() {
  return (   
        <Routes> 
          <Route path="/" element={<Caracteristique />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/allPodcasts/:topic" element={<Podcasts_topic />} />
          <Route path="/podcast/:podcast_id" element={<Podcast_detail />} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
        </Routes>  
  );
}

export default App;
