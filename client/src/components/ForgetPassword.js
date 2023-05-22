import React, { useState } from 'react';
import Header from './header';
import axios from 'axios';
import '../lib/style/log.css';
import evey from '../lib/img/evey.jpg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/forgetPassword', {
        email: email,
      });
      console.log(response.data);
      toast.success('Email for reset password was send successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error on sending email for reset password.');
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
              <label>Email Address</label>
              <input
                type='email'
                placeholder='Enter your email'
                className='input-field'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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

export default ForgetPassword;
