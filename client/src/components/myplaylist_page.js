import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; 
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbarclient from './navbarclient';

function Myplaylist() { 
  const { user_id } = useParams();// variable pour stocker l'id de l'utilisateur
  const [Playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [myFilteredPlaylists, setmyFilteredPlaylists] = useState([]);
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
    axios.get('http://localhost:5000/playlist/playlists') // `${host}/playlist/playlists`
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  const [loading, setLoading] = useState(false);

  const deletePlaylist = async (playlist_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/playlist/deletePlaylist/${playlist_id}`);
      console.log(response.data); // si vous voulez afficher la réponse de suppression
      // Mettre à jour la liste des playlists si nécessaire
      setPlaylists(Playlists.filter(playlist => playlist.id !== playlist_id)); // enlevez la playlist supprimer de la variable state et met à jour les données
      toast.success('Playlist successfully deleted!');
    } catch (error) {
      console.error('Failed to delete playlist', error);
      toast.error('An error occurred while deleting the playlist.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (profile) {
      // ici on utilise une variable temporaire pour stocker la liste filtrée
      const filteredPlaylists = Playlists.filter(playlist => playlist.userId === parseInt(profile.id))
                                          .filter(playlist => playlist.title.toLowerCase().includes(search.toLowerCase()));
      setmyFilteredPlaylists(filteredPlaylists);
    }
  }, [Playlists, profile, search]);
  
  // Utiliser myFilteredPlaylists pour le rendu
  const numPlaylists = myFilteredPlaylists.length;


  const handleCreatePlaylist = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/playlist/newplaylist/${profile.id}`, {
        title: title,
      });
      console.log(response.data);
      // Reset form values
      setTitle('');
    } catch (error) {
      console.error(error);
    }
  };

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
      <div className="myplaylist_page">

        <section className='myplaylist_all_section'>

            <div className='myplaylist_top_part'>
              <h2>My Playlists</h2>
              <p><img src='/micro1.jpg' id='mic_icon_mypodcast'/>{numPlaylists} Playlists imported</p>

              <span className="searchbar_mypodcast">
                <input type="text" placeholder="Search your playlist..." value={search} onChange={(e) => setSearch(e.target.value)} /> 
                <button ><img src='/search.png' /></button>
              </span>
            </div>


            <div className='myplaylist_section'>
              <div className='newpaylist'>
                <input type="text" id="title" value={title} placeholder="New playlist..." onChange={(event) => setTitle(event.target.value)} required />
                <button id='add_new_playlist_button' onClick={handleCreatePlaylist}>Add this playlist</button>
              </div>
                
                  <div className='all_myplaylist'>  
                    {myFilteredPlaylists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(paylist => (
                        <div>
                          <div className='myplaylist' key={paylist.id}> 
                            
                            <div className='playlist_info'>
                              <Link to={`/playlist/${paylist.id}`}><h3>{paylist.title}</h3></Link>
                              <p>Podcasts</p>     
                            </div>

                            <div className='playlist_links_and_buttons'>
                              {/*<Link to={`/editPlaylist/${paylist.id}`}><FontAwesomeIcon icon={faPenToSquare} id='edit_icon_mypodcast' />Edit</Link> */} 
                              <button onClick={() => deletePlaylist(paylist.id)} disabled={loading}>Delete</button>
                            </div>
                            
                          </div>  
                          <div className='theline_playlist'></div>
                        </div>
                    ))}           
                  </div>
            </div>
        </section>
        
      </div>

      <footer className='footer2'>
      <Link to='/podcasts'>Back to Main page</Link>
      <Link to={`/mypodcast/${profile.id}`}>Go to my podcasts</Link>
      </footer>

      <ToastContainer />
      </>
      );
  }
    
export default Myplaylist;  