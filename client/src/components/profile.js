
import React ,{useEffect,useState}from "react";
import axios from 'axios';
/*import evey from '../profile.jpg';*/
import '../lib/style/log.css';
import ChangePasswordForm from './changePassword';

import { Navigate } from 'react-router-dom';
import Navbarclient from "./navbarclient";


function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
   
  const handleShowPasswordForm = () => {
    setShowPasswordForm(true);
  };

  const handleHidePasswordForm = () => {
    setShowPasswordForm(false);
  };

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


  //name upadete 
  const handleUpdateNameClick = () => {
    setIsUpdatingName(true);
  };
  //email update 
  const handleUpdateEmailClick = () => {
    setIsUpdatingEmail(true);
  };
   //name getting new value 
  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };
   //email getting new value 
  const handleEmailChange = (event) => {
    setUpdatedEmail(event.target.value);
  };
  


  const handleNameUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/resetName/${profile.id}`, {
        name: updatedName
      });
  
      setProfile(response.data);
      setIsUpdatingName(false);
    } catch (error) {
      console.error(error);
    }
  };
   

  const handleEmailUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/users/resetEmail/${profile.id}`, {
        email: updatedEmail
      });
  
      setProfile(response.data);
      setIsUpdatingEmail(false);
    } catch (error) {
      console.error(error);
    }
  };



  const handleDeleteUser = () => {
    axios
      .post(`http://localhost:5000/users/send-confirmation-email/${profile.id}`)
      .then((response) => {
        console.log(response, 'this response for send mail supprisiion compte');
        // rediriger vers la page de connexion ou la page d'accueil après la suppression réussie
      })
      .catch((error) => {
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
    <div>
      <Navbarclient />
      <div className="containerprofile">
        <div className="signup-box">
          
          <div className="col-2">
            <h2>Account Information</h2>
            <hr />
            <label>Username</label>

            <div style={{ display: 'flex' }}>
              {isUpdatingName ? (
              <input
               type="text"
               value={updatedName}
               onChange={handleNameChange}
               className="input-field"
              />
             ) : (
             <div className="input-field">{profile.name}</div>
                 )}
             <button id="delete" onClick={isUpdatingName ? handleNameUpdate : handleUpdateNameClick}>
              {isUpdatingName ? 'Save' : 'Update'}
            </button>
         </div>
         <label>Password</label>

          <div  style={{ display: 'flex' }}>

          {showPasswordForm ? (
    <ChangePasswordForm />
  ) : (
    <input type="password" value={profile.password} readOnly className="input-field" />
  )}
  <div>
    {showPasswordForm ? (
      <button id="delete" onClick={handleHidePasswordForm}>Cancel</button>
    ) : (
      <button id="delete" onClick={handleShowPasswordForm}>Update</button>
    )}
  </div>

   </div>

            <div style={{ display: 'flex' }}>
              {isUpdatingEmail ? (
              <input
               type="email"
               value={updatedEmail}
               onChange={handleEmailChange}
               className="input-field"
              />
             ) : (
               <div className="input-field">{profile.email}</div>
                 )}
               <button id="delete" onClick={isUpdatingEmail ? handleEmailUpdate : handleUpdateEmailClick}>
               {isUpdatingName ? 'Save' : 'Update'}
              </button>
               </div>

            <h2>About my account</h2>
            <hr />
            <div className="row">
              <input type="radio" />
              <span>
                {' '}
                <a href="#">Delete my account? </a>
              </span>{' '}
              <button onClick={handleDeleteUser} id="delete" style={{marginLeft:"200px"}}>
                Delete
              </button>
           
              </div>
                
         
                </div>
               </div>
              </div>
             
            </div>)
        
        }
        
        
        
        export default Profile;