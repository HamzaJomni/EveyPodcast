import React, { useState, useEffect ,useRef, useCallback} from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
/*import AudioPlayer from './react audio player/react-audio-player';*/
import ReactPlayer from 'react-player';
import Navbarclient from './navbarclient';
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../lib/style/react_audio_player.css';
import Audio from 'react-audio-player';
import ReportPopup from './reportPopUp';


function Podcast_detail() {
    const { podcast_id } = useParams(); // variable pour stocker l'id cliqué
    const [Tracks, setTracks] = useState([]);
    const [trackDurations, setTrackDurations] = useState([]);
    const audioRef = useRef(null);

    const [podcastID, setpodcastID] = useState([]); // contient les donnée du podcast

    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

    const [audioInfo, setAudioInfo] = useState({
      id:'',
      title: '',
      src: '',
    });

    const [clickedTrack, setClickedTrack] = useState(null);  
    const [numViews, setNumViews] = useState(0);  // Ajouter un nouveau state pour stocker le nombre de vues
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

    const handleReportClick = () => {
      setIsReportPopupOpen(true);
    };
  
    const handleReportClose = () => {
      setIsReportPopupOpen(false);
    };

    const handleAudioSelect = (id, title, src) => {
      setAudioInfo({id, title, src});
    };    
    
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get('http://localhost:5000/users/user/profile', {
          withCredentials: true,
        })
        .then((result) => {
          if (result.data.success) {
            setProfile(result.data.user);
          } else {
            setError('Failed to get profile');
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to get profile');
        });
    }, []);

    const handlePlay = useCallback((trackId) => {
      axios.get(`http://localhost:5000/track/${trackId}`)
        .then(response => {
          console.log(response, "handle play working")
           setClickedTrack(response.data.id); 
        })
        .catch(error => {
          console.log(error,"Error");
        });
       setStartTime(Date.now());
    
    }, []); // empty dependency array to memoize the function

      // requete post du temps ecoute 
      console.log(clickedTrack,"clicked track")

      //lorsque le player est mis en pause 
        const handlePause = () => {
      // setEndTime(Date.now());
        const end=Date.now()
        console.log(startTime,"StartTime");
        console.log(end,"EndTime");
        //const timeListened = (endTime - startTime) / 1000; // convert to seconds
        const timeListened = ((end - startTime) / (1000)).toFixed(1); 
        console.log(timeListened,"timelistened");
        axios.post('http://localhost:5000/track/timelistned', {
          trackId: clickedTrack,
          listeningTime: timeListened
        }).then(response => {
          console.log(response.data,"response.data");
        }).catch(error => {
          console.log(error);
        });
      };

    useEffect(()=>{
        axios.get('http://localhost:5000/users/user/profile',{
            withCredentials: true,
          }).then((result)=>{console.log(result.data,"User");setProfile(result.data.user)}).catch((err)=>{console.log(err,12)});
    },[])


  //recuperer les data du podcast cliqué
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:5000/podcast/podcast/${podcast_id}`);
          setpodcastID(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, [podcast_id]);
  
      // Envoyer une demande POST pour enregistrer le nombre de vues à chaque fois que la page est chargée
      useEffect(() => {
      axios.post(`http://localhost:5000/podcast/podcasts/${podcast_id}/view`)
          .then(response => {
              setNumViews(response.data.numViews);
          })
          .catch(error => {
              console.log(error);
          });
    }, [podcast_id]);
   
     
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/track/tracks');
          setTracks(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      axios.get('http://localhost:5000/playlist/playlists')
        .then(response => {
          setPlaylists(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const handleAddPodcastToPlaylist = (playlistId, podcastId) => {
      const playlistTitle = playlists.find((playlist) => playlist.id === parseInt(playlistId)).title;

      axios.post(`http://localhost:5000/playlist_podcast/playlist/${playlistId}/podcast/${podcastId}`)
        .then(response => {
          console.log('Podcast added to playlist:', response.data);
          toast.success(`Podcast added to playlist "${playlistTitle}"`);
        })
        .catch(error => {
          console.log(error);
          toast.error(`Error when adding the podcast to the playlist "${playlistTitle}"`);
        });
    };
    

    return (
      <div className='podcast_detail_interface'>
        {profile ? <Navbarclient/> : <Header/>}

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
              
              {/*<p id='share_id'>Share this podcast</p>
              <span className='reseau_sociaux_id'>
                <img src='/fb.jpg' id='fb_id'/> <img src='/twitter.jpg' id='twitter_id'/>
              </span>*/}
              <button  id="signupbutton"  style={{marginLeft:"100px"}}     onClick={handleReportClick}>Report this podcast</button>
          </div>  
          {isReportPopupOpen && <ReportPopup onClose={handleReportClose} podcastId={podcastID} />}            
        </section>

        <section className='tracks_section'>
          
        { profile &&
          <select id="playlist-selection" value={selectedPlaylistId} onChange={(event) => handleAddPodcastToPlaylist(event.target.value, podcastID.id)}>
            <option value="">Add to playlist</option>
            
              {playlists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .filter(playlist => playlist.userId === parseInt(profile.id)).map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>{playlist.title}</option>
              ))}
         </select>
        }
          <h3>All Tracks</h3>
          <div>
          {Tracks.filter(track => track.podcastId === parseInt(podcast_id)).map((track, index) => {
              const date = new Date(track.created_at);
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              const formattedDate = date.toLocaleDateString('en-US', options);

              
              return (
                <div className='track' key={track.id}>
                    <div className='theline'></div>
                    <Audio src={track.trackUrl} onLoadedMetadata={(e) => {
                      const duration = e.target.duration;
                      const minutes = Math.floor(duration / 60);
                      const seconds = Math.floor(duration % 60);
                      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

                      // Copiez le tableau de durées actuel
                      const newTrackDurations = [...trackDurations];
                      // Modifiez la durée formatée de la piste actuelle
                      newTrackDurations[index] = formattedDuration;
                      // Mettez à jour le tableau de durées
                      setTrackDurations(newTrackDurations);
                    }} />

                    <div className="track_container">
                      <span>
                        <img src='/micro1.jpg' id='mic_icon_track'/>
                      </span> 

                      <span className='track_info'>
                        <h4>{track.title}</h4>
                        <p>{formattedDate} • {trackDurations[index] ? trackDurations[index] + " min" : ""}</p>
                        <p>{track.description}</p>
                        
                      </span>

                      <span className='bouton_play_track'>
                        <button onClick={() => handleAudioSelect(track.id, track.title, track.trackUrl)}>
                          <img src='/play1.jpg' id='play_track'/>
                        </button>                    
                      </span> 
                      
                    </div>
                </div>
              );
            })}
          </div>
            <div className='space'></div>
          <div className="react-h5-audio-player">
            <AudioPlayer
            
              autoPlay
              src={audioInfo.src}
              header={audioInfo.title}   
              ref={audioRef} 
              onPlay={() => handlePlay(audioInfo.id)} 
              onPause={handlePause}       
            />
          </div>

        </section>
        <ToastContainer />
      </div>
    );
}

export default Podcast_detail;  