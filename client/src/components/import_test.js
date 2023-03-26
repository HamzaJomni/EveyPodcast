/*
import React, { useState } from 'react';
import axios from 'axios';
import Header from "./header";
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';
import Jimp from 'jimp';

function ImportPodcast() {
  /*********************************aws s3 image export**************** */
  /*
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      // Load the image with Jimp
      const image = await Jimp.read(file);

      // Crop the image to a square of 500x500 pixels
      image.cover(500, 500);

      // Convert the image to a buffer
      const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

      // Create a new File object from the buffer
      const croppedFile = new File([buffer], file.name, { type: 'image/jpeg' });

      // Créer un nouvel objet FormData pour envoyer le fichier aux backend
      const formData = new FormData();
      formData.append('image', croppedFile);

      // Envoyer la requête HTTP POST à l'endpoint `/uploadPodcastImage`
      const response = await axios.post('http://localhost:5000/podcast/uploadPodcastImage', formData);

      // Stocker l'URL de l'image dans l'état `imageUrl`
      setImageUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };
  /********************************aws s3 image export***************** */
/*
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('News & Politics');
  const [successMessage, setSuccessMessage] = useState('');
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
  function handleTopicChange(event) {
    setTopic(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const podcastData = { title, description, author, topic };
    
  try {
    const response = await axios.post('http://localhost:5000/podcast/newPodcast', podcastData);
      console.log(response.data);
      setSuccessMessage('Podcast created successfully!');
      setTitle('');
      setDescription('');
      setAuthor('');
      setTopic('');
      /*setTimeout(() => {
        navigate('/Podcasts'); // redirection vers la page des podcasts
      }, 2000); // redirection après 2 secondes
    } catch (error) {
      console.error(error);
    }
};


  return (
    <>
    <Header/>

    <form onSubmit={handleSubmit} className='form_podcast'>
        <h2>Add New Podcast</h2>
        <h3>PODCAST DETAILS</h3>
        <div className='theline_form'></div>

      <div className='titlesection'>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} placeholder="Enter the podcast title please..." onChange={(event) => setTitle(event.target.value)} required />
      </div>

      <div> 
        <input type="file" onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="Podcast Image" />}  
      </div>
  

      <div className='description_section'>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} placeholder="Enter the description podcast please..." onChange={(event) => setDescription(event.target.value)} required />
      </div>

      <div className='author_section'>
        <label htmlFor="author">Author Name</label>
        <input type="text" id="author" value={author} placeholder="This will be gone when we create author profile..." onChange={(event) => setAuthor(event.target.value)} required />
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
        <button type="submit" id='import_podcast_bottom' onClick={handleUploadClick}>Save Podcast</button>
        {successMessage && <div className='success_message'>{successMessage}</div>}
      </div>
    </form>
    </>
  );
}

export default ImportPodcast;
*/
