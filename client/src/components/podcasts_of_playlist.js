import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; 
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbarclient from './navbarclient';

function PodcastsOfPlaylist() {
  const { playlist_id } = useParams();
  const [Podcasts, setPodcasts] = useState([]);
  const [search, setSearch] = useState('');

  const [Playlists, setPlaylists] = useState([]);
  const [MyPlaylists, setMyPlaylists] = useState([]);
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

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/playlist/playlists');
        setPlaylists(response.data);
        setMyPlaylists(response.data);
        
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylists();
  }, []);

  //get tous les données de la table joiture Playlist_podcasts
  const [Playlists_podcasts, setPlaylists_podcasts] = useState([]);

  useEffect(() => {
    const fetchPlaylists_podcasts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/playlist_podcast/playlists_podcasts');
        setPlaylists_podcasts(response.data);
        
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylists_podcasts();
  }, []);
  console.log(Playlists_podcasts)
  //pour obtenir la playlist actuel et afficher sont titre
  const playlist = Playlists.find(p => p.id === parseInt(playlist_id));

  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts') // `${host}podcast/podcasts`
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  const [loading, setLoading] = useState(false);

  const removePodcast = async (paylist_id, podcast_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/playlist_podcast/removePodcast/playlist/${paylist_id}/podcast/${podcast_id}`);
      console.log(response.data); // si vous voulez afficher la réponse de suppression
      // Mettre à jour la liste des podcasts si nécessaire
      setPodcasts(Podcasts.filter(podcast => podcast.id !== podcast_id)); // enlevez le podcast supprimer de la variable state
      toast.success('Podcast successfully removed!');
    } catch (error) {
      console.error('Failed to delete podcast', error);
      toast.error('An error occurred while removing the podcast.');
    }
    setLoading(false);
  };

  const handleAddPodcastToPlaylist = (playlistId, podcastId) => {
    const playlistTitle = Playlists.find((playlist) => playlist.id === parseInt(playlistId)).title;

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

  
  const filteredPodcasts = Playlists_podcasts.filter(
    playlistPodcast => playlistPodcast.playlistId === parseInt(playlist_id)
  );

  const podcastIds = filteredPodcasts.map(playlistPodcast => playlistPodcast.podcastId);

  const podcastsInPlaylist = Podcasts.filter(podcast => podcastIds.includes(podcast.id));

    //filtrer les podcasts selon l'user id connecté actuel

    const filteredPodcasts_with_search = podcastsInPlaylist.filter(podcast => podcast.title.toLowerCase().includes(search.toLowerCase()) || podcast.topic.toLowerCase().includes(search.toLowerCase()));
   //pour calculer le nombres de podcasts d'un utilisateur, et après filtrage.
    const numPodcasts = filteredPodcasts_with_search.length;

    

    if (error) {
      // Rediriger l'utilisateur vers la page d'accueil s'il y a une erreur
      return <Navigate to="/" />; 
    }
  
    if (!profile) {
      // Si l'utilisateur n'a pas encore été chargé, on affiche un message de chargement
      return <div>Loading...</div>;
    } 

    return (
      <>
      <Navbarclient/>
      <img  src='/hero_mypodcast1.jpg' id='hero_id' />
      <div className="mypodcast_page">

        <section className='mypodcast_top_part'>
            <div>
            <h2>{playlist ? playlist.title : "Playlist"}</h2>

                <p><img src='/micro1.jpg' id='mic_icon_mypodcast'/>{numPodcasts} Podcasts imported</p>

                <span className="searchbar_mypodcast">
                  <input type="text" placeholder="Search your podcast..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    
                    <button >
                        <img src='/search.png' />
                    </button>
                </span>
            </div>

        </section>
        
          <section className='mypodcast_container'>
            {filteredPodcasts_with_search.map(podcast => (
              <div className='mypodcast' key={podcast.id}> 
                
                  <div>
                    <Link to={`/podcast/${podcast.id}`}>
                      <img src={podcast.imageUrl} /> 
                    </Link>
                  </div>

                  <div className='mypodcast_info'>
                    <Link to={`/podcast/${podcast.id}`}>
                      <h3>{podcast.title}</h3>
                    </Link>  
                    <Link to={`/allPodcasts/${podcast.topic}`}><h4>{podcast.topic}</h4></Link>
                    <p>{podcast.description.slice(0, 200)}{podcast.description.length > 200 ? '...' : ''}</p>


                    <div className='mypodcast_links'>
                    <Link to={`/podcast/${podcast.id}`}>Listen this podcast</Link>
                      <button onClick={() => removePodcast(playlist.id, podcast.id)} disabled={loading}>
                        Remove from playlist
                      </button>

                    {/*<Link to={`/newTrack/${podcast.id}`}>Add to playlist<img src='/fleche_en_bas_orange.jpg' id='fleche_en_bas_orange'/></Link>*/}
                    <select id="playlist-selection" value={selectedPlaylistId} onChange={(event) => handleAddPodcastToPlaylist(event.target.value, podcast.id)}>
                        <option value="">Add to playlist</option>
                        
                          {MyPlaylists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                          .filter(playlist => playlist.userId === parseInt(profile.id)).map((playlist) => (
                              <option key={playlist.id} value={playlist.id}>{playlist.title}</option>
                          ))}
                    </select>
                    </div>
                  </div>
              </div>  
            ))}
          </section>

      </div>
      <footer className='footer2'>
      <Link to='/podcasts'>Back to Main page</Link>
      <Link to={`/myplaylists${profile.id}`}>Go to my playlists</Link>
      </footer>

      <ToastContainer />
      </>
      );
  }
    
export default PodcastsOfPlaylist;  