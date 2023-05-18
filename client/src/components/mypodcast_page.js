import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'; 
import Navbarclient from './navbarclient';

function Mypodcast() {

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

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
  
  const [Podcasts, setPodcasts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts') // `${host}podcast/podcasts`
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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

  const [loading, setLoading] = useState(false);

  const deletePodcast = async (podcast_id) => {
    setLoading(true);
    try {
      console.log(podcast_id);
      const response = await axios.delete(`http://localhost:5000/podcast/deletePodcast/${podcast_id}`);
      console.log(response.data); // si vous voulez afficher la réponse de suppression
      // Mettre à jour la liste des podcasts si nécessaire
      setPodcasts(Podcasts.filter(podcast => podcast.id !== podcast_id)); // enlevez le podcast supprimer de la variable state
      toast.success('Podcast successfully deleted!');
    } catch (error) {
      console.error('Failed to delete podcast', error);
      toast.error('An error occurred while deleting the podcast.');
    }
    setLoading(false);
  };

  const [myfilteredPodcasts, setmyFilteredPodcasts] = useState([]);
  useEffect(() => {
    if (profile) {
      // ici on utilise une variable temporaire pour stocker la liste filtrée
      const filteredPodcasts = Podcasts.filter(podcast => podcast.userId === parseInt(profile.id))
                                         .filter(podcast => podcast.title.toLowerCase().includes(search.toLowerCase()) || podcast.topic.toLowerCase().includes(search.toLowerCase()));
                                          
      setmyFilteredPodcasts(filteredPodcasts);
    }
  }, [Podcasts, profile, search]);
  
  const numPodcasts = myfilteredPodcasts.length;

  if (error) {
    // Rediriger l'utilisateur vers la page d'accueil s'il y a une erreur
    return <Navigate to="/" />; 
  }

  if (!profile) {
    // Si l'utilisateur n'a pas encore été chargé, on affiche un message de chargement
    return <div>Loading...</div>;
  } 

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
      <>
      <Navbarclient/>

      <img  src='/hero_mypodcast1.jpg' id='hero_id' />
      <div className="mypodcast_page">

        <section className='mypodcast_top_part'>
            <div>
                <h2>My Podcasts</h2>
                <p><img src='/micro1.jpg' id='mic_icon_mypodcast'/>{numPodcasts} Podcasts imported</p>

                <span className="searchbar_mypodcast">
                  <input type="text" placeholder="Search your podcast..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    
                    <button >
                        <img src='/search.png' />
                    </button>
                </span>
            </div>
            <div>
              <Link to='/newPodcast'>
                <FontAwesomeIcon icon={faPlus} id='plus_icon_mypodcast' />
                ADD NEW PODCAST
              </Link>
        
            </div>
        </section>
        
          <section className='mypodcast_container'>
            {/*.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))*/
              myfilteredPodcasts.map(podcast => (
              <div className='mypodcast' key={podcast.id}> 
                
                  <div>
                    <Link to={`/mypodcast/${podcast.id}/tracks`}>
                      <img src={podcast.imageUrl} /> 
                    </Link>
                  </div>

                  <div className='mypodcast_info'>
                    <Link to={`/mypodcast/${podcast.id}/tracks`}>
                      <h3>{podcast.title}</h3>
                    </Link>  
                    <Link to={`/allPodcasts/${podcast.topic}`}><h4>{podcast.topic}</h4></Link>

                    <Link to={`/mypodcast/${podcast.id}/tracks`}>
                    <p>{podcast.description.slice(0, 200)}{podcast.description.length > 200 ? '...' : ''}</p>
                    </Link>

                    <div className='mypodcast_links'>
                      <Link to={`/newTrack/${podcast.id}`} disabled={loading}>Add track</Link>
                      <button onClick={() => deletePodcast(podcast.id)} disabled={loading}>
                        Delete podcast
                        {/*loading ? 'Suppression en cours...' : ''*/}
                      </button>

                      {/*<Link to={`/newTrack/${podcast.id}`}>Add to playlist<img src='/fleche_en_bas_orange.jpg' id='fleche_en_bas_orange'/></Link>*/}
                      <select id="playlist-selection" value={selectedPlaylistId} onChange={(event) => handleAddPodcastToPlaylist(event.target.value, podcast.id)}>
                          <option value="">Add to playlist</option>
                          
                            {playlists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .filter(playlist => playlist.userId === parseInt(profile.id)).map((playlist) => (
                                <option key={playlist.id} value={playlist.id}>{playlist.title}</option>
                            ))}
                      </select>
                    </div>
                  </div>

                  <div className='mypodcast_edit'>
                  <Link to={`/editPodcast/${podcast.id}`}><FontAwesomeIcon icon={faPenToSquare} id='edit_icon_mypodcast' />Edit</Link>
                  </div>
              </div>  
            ))}
          </section>

      </div>
      <footer className='footer2'>
      <Link to='/podcasts'>Back to Main page</Link>
      <Link to={`/myplaylists/${profile.id}`}>Go to my playlists</Link>
      </footer>

      <ToastContainer />
      </>
      );
  }
    
export default Mypodcast;  