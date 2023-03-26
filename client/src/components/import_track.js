import React, { useState } from 'react';
import axios from 'axios';
import Header from "./header";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


function ImportTrack() {
  const [file, setFile] = useState(null);
  const { podcastId } = useParams(); // variable pour stocker l'id du podcast 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('title', title);
    formData.append('description', description);

    const response = await axios.post(`http://localhost:5000/track/newTrack/${podcastId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        console.log(`Upload Progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
      }
    });

    console.log(response.data);
    setSuccessMessage('Track created successfully!');
    setTitle('');
    setDescription('');

    setTimeout(() => {
      navigate(`/podcast/${podcastId}`); // redirection vers la page podcast detail de "podcastId"
    }, 2000); // redirection après 2 secondes
  } catch (error) {
    console.error(error);
  }
};


  return (
    <>
    <Header/>

    <form onSubmit={handleSubmit} className='form_podcast'>
        <h2>Add New Track</h2>
        <h3>TRACK DETAILS</h3>
        <div className='theline_form'></div>

      <div className='titlesection'>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} placeholder="Enter the Track title please..." onChange={(event) => setTitle(event.target.value)} required />
      </div>

      <div className='description_section'>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} placeholder="Enter the description track please..." onChange={(event) => setDescription(event.target.value)} required />
      </div>

      <h3 id='import_topic_title'>IMPORT TRACK</h3>
      <div className='theline_form'></div>
      
      <div className='importAudio_section'> 
        <h4>TRACK AUDIO</h4>
        <input type="file" accept="audio/*" onChange={handleFileChange} />  
      </div>

      <div className='uploadbutton_container'>
        <button type="submit" id='import_podcast_bottom'>Save Track</button>
        {successMessage && <div className='success_message'>{successMessage}</div>}
      </div>
    </form>
    </>
  );
}

export default ImportTrack;

