import './App.css'
import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Caracteristique from "./components/caracteristique"
import Podcasts from "./components/podcasts"
import Podcasts_topic from "./components/podcasts_topic"
import Podcast_detail from "./components/podcast_detail"
import SearchResult from './components/search_result';
import ImportPodcast from './components/import_podcast';
import ImportTrack from './components/import_track';
import ImageUploader from './components/import_test'; 

import Register from './components/register';
import Login from './components/login';
import Clientpage from './components/clientpage';

import Profile from './components/profile';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/resetPassword';
import PageNotFound from './components/pagenotfound';

function App() {
  return (   
        <Routes> 
          <Route path="/" element={<Caracteristique />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/allPodcasts/:topic" element={<Podcasts_topic />} />
          <Route path="/podcast/:podcast_id" element={<Podcast_detail />} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
          <Route path="/newPodcast" element={<ImportPodcast />} />
          <Route path="/newTrack/:podcastId" element={<ImportTrack />} />
          <Route path="/imageUploader" element={<ImageUploader />} />
          <Route path="/sign-up" element={<Register/>}/>
          <Route path='/sign-in'element ={<Login/>}/>
          <Route path='/clientpage'element ={<Clientpage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>
          <Route path='/resetPassword/:id/:token' element={<ResetPassword/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>  
  );
}

export default App;
