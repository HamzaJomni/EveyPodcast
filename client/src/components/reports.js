import React, { useState, useEffect } from 'react';
import NavbarAdmin from './navbaradmin';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../lib/style/log.css';

function Reports() {
  const [reportedPodcasts, setReported] = useState([]);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  // verifying acces to this page (only admin)
  useEffect(() => {
    axios
      .get('http://localhost:5000/users/user/profile', {
        withCredentials: true,
      })
      .then((result) => {
        if ((result.data.success) &&(result.data.user.role=="admin") ) {
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
//getting reported podcasts 

  useEffect(() => {
    axios.get('http://localhost:5000/report/reported_podcasts')
      .then(response => {
        console.log(response.data);
        setReported(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  // group podcasts by author
  const podcastsByAuthor = reportedPodcasts.reduce((acc, podcast) => {
    if (!acc[podcast.author]) {
      acc[podcast.author] = [];
    }
    acc[podcast.author].push(podcast);
    return acc;
  }, {});

  // block or unblock a podcast
  const handleBlock = (id, status) => {
    const newStatus = status === 'active' ? 'blocked' : 'active';
    axios.put(`http://localhost:5000/podcast/block_podcast/${id}`, { status: newStatus })
      .then(response => {
        console.log(response.data);
        // update the UI
        const updatedPodcasts = reportedPodcasts.map(podcast => {
          if (podcast.podcastId === id) {
            return {
              ...podcast,
              status: newStatus,
            };
          } else {
            return podcast;
          }
        });
        setReported(updatedPodcasts);
      })
      .catch(error => {
        console.error(error);
      });
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
    <section>
      <NavbarAdmin />

      {Object.entries(podcastsByAuthor).map(([author, podcasts]) => (
        <div className="table-container" key={author} >
          <h2 className="author-header">{author}</h2>
          <table>
            <thead>
              <tr>
                <th>Podcast Title</th>
                <th>Reason</th>
                <th>Reported At</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map(podcast => (
                <tr key={podcast.id}>
                  <td>{podcast.title}</td>
                  <td>{podcast.reason}</td>
                  <td>{new Date(podcast.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</td>
                  <td>
                    {podcast.status === 'active' ? (
                      <button onClick={() => handleBlock(podcast.podcastId, podcast.status)} className="btn-block" >Block</button>
                    ) : (
                      <button onClick={() => handleBlock(podcast.podcastId, podcast.status)} className="btn-block" style={{background:"green"}}>Unblock</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

export default Reports;
