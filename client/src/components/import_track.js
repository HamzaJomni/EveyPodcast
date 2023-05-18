import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbarclient from './navbarclient';


function ImportTrack() {
  const [file, setFile] = useState(null);
  const { podcastId } = useParams(); // variable pour stocker l'id du podcast 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    const isValid = !/^\d+$/.test(description) && description.length <= 230;
    setDescription(description);
  
    if (!isValid) {
      setDescription('');
      return;
    }    
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  setIsLoading(true); // activer le chargement

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
        setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
      },
    });

    console.log(response.data);
    setSuccessMessage('Track created successfully!');
    setTitle('');
    setDescription('');
    setFile(null);
    setIsLoading(false); // désactiver le chargement
    
    setTimeout(() => {
      navigate(`/podcast/${podcastId}`); // redirection vers la page podcast detail de "podcastId"
    }, 2000); // redirection après 2 secondes
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
    <Navbarclient/>

    <form onSubmit={handleSubmit} className='form_podcast'>
        <h2>Add New Track</h2>
        <h3>TRACK DETAILS</h3>
        <div className='theline_form'></div>

      <div className='titlesection'>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} placeholder="Enter the Track title please..." onChange={(event) => setTitle(event.target.value)} pattern="^(?!\d+$).{1,80}$" required />
        <p className="title_validateur">80 characters maximum and not only digits</p>
      </div>

      <div className='description_section'>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} placeholder="Enter the description track please..." onChange={handleDescriptionChange} required />
        <p className="Description_validateur">230 characters maximum and not only digits</p>
      </div>

      <h3 id='import_topic_title'>IMPORT TRACK</h3>
      <div className='theline_form'></div>
      
      <div className='importAudio_section'> 
        <h4>TRACK AUDIO</h4>
        <input type="file" accept="audio/*" onChange={handleFileChange} required/>  
      </div>
    
      <div className='uploadbutton_container'>
      <button type="submit" id='import_podcast_bottom' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Save Track'} 
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

export default ImportTrack;

