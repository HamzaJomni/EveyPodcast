import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createObjectURL } from 'url';
import { Navigate } from 'react-router-dom'; 
import Navbarclient from './navbarclient';


function EditPodcast() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [topic, setTopic] = useState('News & Politics');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    const topics = [
      'News & Politics',
      'Economy and Business',
      'Technologie',
      'Start-up',
      'Government',
      'History',
      'Educational',
      'Sport And Leisur',
      'Health And Wellness',
      'Companies And Tunisia',
      'Arts & Culture',
      'Tv & Films',
      'Society & Culture',
      'Religion & Spirituality',
      'Other'
    ];

    const { podcast_id } = useParams();
    /*const [podcast, setPodcast] = useState({});*/

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
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:5000/podcast/podcast/${podcast_id}`);
          /*setPodcast(response.data);*/
          setTitle(response.data.title);
          setDescription(response.data.description);
          setTopic(response.data.topic);
          setFileUrl(response.data.imageUrl)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, [podcast_id]);

    const handleDescriptionChange = (event) => {
      const description = event.target.value;
      const isValid = !/^\d+$/.test(description) && description.length <= 500;
      setDescription(description);
    
      if (!isValid) {
        setDescription('');
        return;
      }    
    };
  
    function handleTopicChange(event) {
      const input = event.target;
      input.onchange = function() {
        if (input.files.length === 0) {
          alert('You must select a new cover');
        } else {
          setTopic(event.target.value);
        }
      };
    }
  
    const handleFileChange = (event) => {
      const newFile = event.target.files[0];
      setFile(newFile);
      setFileUrl(URL.createObjectURL(newFile));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true); // activer le chargement
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('author', profile.name);
        formData.append('topic', topic);
        formData.append('image', file);
  
        const response = await axios.put(`http://localhost:5000/podcast/editPodcast/${podcast_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          },
        });
  
        console.log(response.data);
        setSuccessMessage('Podcast updated successfully!');
        setIsLoading(false); // désactiver le chargement
        setTimeout(() => {
          navigate(`/mypodcast/${profile.id}`);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };

    //redirection vers la page d'acceuil si le délais de connexion et dépasser
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

    <form onSubmit={handleSubmit} className='form_podcast'>
        <h2>Edit Podcast</h2>
        <h3>PODCAST DETAILS</h3>
        <div className='theline_form'></div>

      <div className='titlesection'>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} placeholder="Enter the podcast title please..." onChange={(event) => setTitle(event.target.value)} pattern="^(?!\d+$).{1,25}$" required />
        <p className="title_validateur">25 characters maximum and not only digits</p>
      </div>

      <div className='imagePodcast_section'> 
        <h4>IMAGE ART</h4>
        {fileUrl && <img src={fileUrl} alt="Podcast Image" />}
        <input type="file" accept="image/*" onChange={handleFileChange} />  
      </div>
  

      <div className='description_section'>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} placeholder="Enter the description podcast please..." onChange={handleDescriptionChange} required />
        <p className="Description_validateur">500 characters maximum and not only digits</p>
      </div>

      <h3 id='import_topic_title'>PODCAST TOPICS</h3>
      <div className='theline_form'></div>

      <div className='import_topic_section'>
        <label htmlFor="topic">Topic</label>
        <select id="topic" value={topic}  onChange={handleTopicChange} required>
          {topics.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className='uploadbutton_container'>
        <button type="submit" id='import_podcast_bottom' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save Podcast'} 
        </button>

        {isLoading &&
      <section>
        <div>
          <progress value={progress} max="100" />
          {progress}%

        </div>
         <div className='loading_wheel'><span class="loader"></span></div>
         </section>
         }
        {successMessage && <div className='success_message'>{successMessage}</div>}
      </div>
    </form>
    </>
  );
}

export default EditPodcast;

