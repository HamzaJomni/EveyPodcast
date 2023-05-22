import ReactAudioPlayer from 'react-modern-audio-player';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function Test() {
  const podcast_id = 1; // variable pour stocker l'id cliqué
  const [tracks, setTracks] = useState([]);
  const [podcast, setPodcast] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    async function fetchPodcast() {
      try {
        const response = await axios.get(`http://localhost:5000/podcast/podcast/${podcast_id}`);
        setPodcast(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPodcast();
  }, [podcast_id]);
  
  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await axios.get('http://localhost:5000/track/tracks');
        setTracks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTracks();
  }, []);

  const filteredTracks = tracks.filter(track => track.podcastId === parseInt(podcast_id));

  const tracksData = filteredTracks.map(track => {
    return {
      title: track.title,
      author: podcast.author,
      img: podcast.imageUrl,
      trackUrl: track.trackUrl,
      id: track.id
    };
  });
  console.log('tracksData', tracksData);

  return (
    <>
      <div>Some content above the player</div>
      <ReactAudioPlayer
        autoPlay={false}
        src={currentTrack ? currentTrack.trackUrl : ''}
        title={currentTrack ? currentTrack.title : ''}
        artist={currentTrack ? podcast.author : ''}
        cover={currentTrack ? podcast.imageUrl : ''}
        currentTime={0}
        duration={0}
        volume={1}
        showSkipControls={false}
        showJumpControls={false}
        showDownloadProgress={false}
        showFilledVolume={true}
        showVolumeControl={true}
        onClickPrevious={null}
        onClickNext={null}
        onEnded={() => setCurrentTrack(null)}
        className="react-audio-player"
      />
    </>
  );
}
