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
import Mypodcast from './components/mypodcast_page';
import EditPodcast from './components/edit_podcast';
import Myplaylist from './components/myplaylist_page';
import PodcastsOfPlaylist from './components/podcasts_of_playlist';
import Mytracks from './components/mytrack_page';
import Test from './components/react audio player/import_test';
import EditTrack from './components/editTrack'; 
import ContactUs from './components/contactUs'; 

import Register from './components/register';
import Login from './components/login';
import Clientpage from './components/clientpage';

import Profile from './components/profile';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/resetPassword';
import PageNotFound from './components/pagenotfound';
import Dhashboard from './components/dashboard';
import Admin from './components/adminDashboard';
import UserBlocked from './components/blockedUser';
import Reports from './components/reports';
import TabClient from './components/tabClient';

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
          <Route path="/sign-up" element={<Register/>}/>
          <Route path='/sign-in'element ={<Login/>}/>
          <Route path='/clientpage'element ={<Clientpage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>
          <Route path='/resetPassword/:id/:token' element={<ResetPassword/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
          <Route path="/mypodcast/:user_id" element={<Mypodcast />} />
          <Route path="/editPodcast/:podcast_id" element={<EditPodcast />} />
          <Route path="/myplaylists/:user_id" element={<Myplaylist />} />
          <Route path="/playlist/:playlist_id" element={<PodcastsOfPlaylist />} />
          <Route path="/mypodcast/:podcast_id/tracks" element={<Mytracks />} />
          <Route path="/podcast/:podcastId/editTrack/:trackId" element={<EditTrack />} />
          <Route path="/Contact-Us" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dhashboard/>}/>
          <Route path="/adminDashboard" element={<Admin/>}/>
          <Route path="/block" element={<UserBlocked/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/userDashboard" element={<TabClient/>}/>
        </Routes>  
  );
}

export default App;
