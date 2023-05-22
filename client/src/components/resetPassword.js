import React, { useState ,useEffect} from 'react';
import Header from './header';
import axios from 'axios';
import '../lib/style/log.css';
import evey from '../lib/img/evey.jpg';
import { useParams } from 'react-router-dom'; // Importez useParams 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ResetPassword() {
  const [password, setPassword] = useState('');

 
  const { id, token } = useParams(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/users/resetPassword/${id}/${token}`, { // Utilisez les paramètres ici
        password: password,
      });
      console.log(response.data);
      toast.success('Successfully reset password!');
    } catch (error) {
      console.error(error);
      toast.error('Error on reset password');
    }
  };

  return (
    <section>
      <Header />
      <div className='containerlog'>
        <div className='signup-box'>
          <div className='col-1'>
            <img src={evey} alt='Evey' />
          </div>
          <div className='col-2'>
            <h2>Reset your password</h2>
            <form onSubmit={handleSubmit}>
              <label>New password Field</label>
              <input
                type="password"
                placeholder='Enter your new password'
                className='input-field'
                
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default ResetPassword;
