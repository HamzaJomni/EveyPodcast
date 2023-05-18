import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createObjectURL } from 'url';
import Navbarclient from './navbarclient';
import { Navigate } from 'react-router-dom'; 

function ImportPodcast() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('News & Politics');
  const [successMessage, setSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
  function handleTopicChange(event) {
    setTopic(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    const isValid = !/^\d+$/.test(description) && description.length <= 500;
    setDescription(description);
  
    if (!isValid) {
      setDescription('');
      return;
    }    
  };
  
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
    setFileUrl(URL.createObjectURL(newFile));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // activer le chargement
    /*
    //validateur si titre et non vide et qu'il contient des lettres et des chiffres et dépasse pas < 25 carac 
    if (title && !title.match(/^\d+$/) && title.length <= 25) {
      // Le titre est valide
    } else {
      // Le titre n'est pas valide
    }

    if (description && !description.match(/^\d+$/) && description.length <= 500) {
      // La description est valide
    } else {
      // La description n'est pas valide
    }
    */
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('author', profile.name);
      formData.append('topic', topic);
      formData.append('userId', profile.id);
      formData.append('image', file);
  
      const response = await axios.post('http://localhost:5000/podcast/newPodcast', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      console.log(response.data);
      setSuccessMessage('Podcast created successfully!');
      setTitle('');
      setDescription('');
      setTopic('');
      setFile(null);
      setIsLoading(false); // désactiver le chargement
      setTimeout(() => {
        navigate(`/mypodcast/${profile.id}`);
      }, 2000);
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

    <form onSubmit={handleSubmit} className='form_podcast'>
        <h2>Add New Podcast</h2>
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
        <input type="file" accept="image/*" onChange={handleFileChange} required/>  
      </div>

      <div className='description_section'>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} placeholder="Enter the podcast description please..." onChange={handleDescriptionChange} required/>
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

export default ImportPodcast;

