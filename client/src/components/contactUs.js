//import dotenv from 'dotenv';
//dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import { Link } from "react-router-dom";
import Navbarclient from './navbarclient';
import { Navigate } from 'react-router-dom';
import SimpleMap from './map';

// Accès aux variables d'environnement définies dans le fichier .env
//const host = process.env.host;  || 'http://localhost:5000/'

function ContactUs() {


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




  return (
    <div>
      {profile ? <Navbarclient/> : <Header/>}
      <img  src='/hero.contact.jpg' id='hero_id' />

      <div className='contact_topContent'>
        <h2>Get in touch with us.</h2>

        <p>Welcome to Evey, the ultimate podcast platform! We are delighted to provide you
           with a unique experience in listening to and sharing your favorite podcasts.</p>

        <p>If you have any questions, suggestions, or if you simply want to learn more
           about our platform, please don't hesitate to contact us. Fill out the form
            below, and we will be pleased to learn more about your needs and answer
             all of your questions.</p>
      </div>
      
      <section className='all_contact_us_page'>
        <div class="container">
            <div class="contactInfo">
                <div>
                    <h2>Contact Info</h2>
                    <ul class="info">
                        <li>
                            <span><img src="https://i.ibb.co/cbnfrDF/location.png" /></span>
                            <span>
                              Les berges du Lac<br/>
                              Av. principale<br/>
                              Tunis 1053
                            </span>
                        </li>
                        <li>
                            <span><img src="https://i.ibb.co/rbbwDkP/mail.png"/></span>
                            <span>hello@evey.live</span>
                        </li>
                        <li>
                            <span><img src="https://i.ibb.co/DGGjsW7/call.png"/></span>
                            <span>29 927 440</span>
                        </li>
                    </ul>
                </div>
                <ul class="sci">
                    <li><a href="https://www.facebook.com/eveytechnologies"><img src="https://i.ibb.co/vxjnyw0/1.png"/></a></li>
                    <li><a href="https://www.instagram.com/eveytechnologies/"><img src="https://i.ibb.co/5jFR49X/3.png"/></a></li>
                    <li><a href="https://www.youtube.com/channel/UCYwSBG5ErVJUzLFQ-P4K6FA"><img src="/black_yt.png"/></a></li>
                    <li><a href="https://www.linkedin.com/company/evey-technologies/"><img src="https://i.ibb.co/GtnC2C8/5.png"/></a></li>
                </ul>

            </div>
            <form action="https://formsubmit.co/jomnihamza@gmail.com" method="POST">
              <div class="contactForm">
                  <h2>Send a Message</h2>
                  <div class="formBox">
                  
                      <div class="inputBox w50">
                          <input type="text" name="First Name" required/>
                          <span>First Name</span>
                      </div>
                      <div class="inputBox w50">
                          <input type="text" name="Last Name" required/>
                          <span>Last Name</span>
                      </div>
                      <div class="inputBox w50">
                          <input type="email" name="Email Address" required/>
                          <span>Email Address</span>
                      </div>
                      <div class="inputBox w50">
                          <input type="text" name="Mobile Number" required/>
                          <span>Mobile Number</span>
                      </div>
                      <div class="inputBox w100">
                          <textarea name="Message" required></textarea>
                          <span>Write Your Massage Here...</span>
                      </div>

                      <input type="hidden" name="_template" value="table"></input>
                      <input type="hidden" name="_next" value="http://localhost:3000/Contact-Us"></input>
                      <div class="inputBox w100">
                          <input type="submit" value="Send"/>
                          
                      </div>
                    
                  </div>
              </div>
            </form>
        </div>
    </section>

    <div>
      
    </div> 

      <Footer/>
    </div>
  );
}

export default ContactUs;