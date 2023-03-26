
import React, { useState, useEffect } from 'react';
import Header from './header.js';
import axios from 'axios';
import '../log.css';
import evey from '../evey.jpg';
import google from '../google.png';
import { Navigate } from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Log(){
   const notify = () => toast(" ✅ Account created successfully");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState('');
   const [isResgister, setIsRegister] = useState(false);

    const initialValues={
        name:"",
        password :"",
        email:"",
      };
      const validationSchema=Yup.object().shape({
        name:Yup.string().max(30).min(3,"Too short").required(),
        password:Yup.string().min(3,"Too short").required(),
        email:Yup.string().required().email()
      })
      
    const redirectGoogle =async()=>{
        //redirection vers google window 
       window.location.replace("http://localhost:5000/users/login/google");
      };
      



      //**************************************** */
      const onSubmit=(data,actions)=>{
    
   
        axios.post("http://localhost:5000/users/user",data).then((response)=>{
          console.log("IT WORKEDDDD");
          console.log(response.data);
          setIsRegister(true);
       notify();
      
        }).catch(error => {
          console.log(error,"ECHEC!");
        });
      };




      //**************************************************** */
    const register=()=>{
        axios.post('http://localhost:5000/users/user',{
          name:username,
          password:password,
          email:email
        })
          .then(response => {
           console.log(response);
          })
          .catch(error => {
            console.log(error,12);
          });
    }

    if (isResgister) {
        // Rediriger l'utilisateur vers la page client après la connexion réussie
      return <Navigate to="/sign-in" />;
     }
    return(
        <section>
       <Header/>
      <div className='containerlog'>
       <div className='signup-box'>
        <div className='col-1'>
            <img src={evey}/>
        </div>
        <div className='col-2'>
            <h2>Welcome to Evey Podcast</h2>
            <span >Already have an account ? <a href='#'id="log">Login</a></span>
            <button className='google-link' id="googlebtn" onClick={redirectGoogle}>
                <img src={google} /> Continue with Google 
                </button>
            <h4>Or</h4>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
            <label>Username</label>
               
               <ErrorMessage name="name" component="span" id="h"/>
               <Field  className='input-field' type ="text"   name="name" placeholder="Please enter your name"  />
      
              
               <label>Password</label>
               <ErrorMessage name="password" component="span" id="h"/>
               <Field  className='input-field' type ="password"   name="password"  placeholder="Please enter your password"/>
              
               <label>Email Adress</label>

               <ErrorMessage name="email" component="span" id="h"/>
               <Field  className='input-field' type ="email"   name="email"  placeholder="Please enter your Email"/>
               
                <button type="submit" >Register Now</button>
            </Form>
            </Formik>
        </div>
       </div>
      </div>
      < ToastContainer/>
       </section>

    )
}
export default Log;