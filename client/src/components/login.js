
import { Link } from "react-router-dom";
import React from 'react';
import Header from "./header";
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../log.css';
import evey from '../evey.jpg';
import google from '../google.png';
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login (){
  const notify = () => toast("❌ Usename or email incorrecte");
const [isLoggedIn, setIsLoggedIn] = useState(false);

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

//const [loginStatus,setLoginStatus]=useState('');

const redirectGoogle =async()=>{
  //redirection vers google window 
  
 window.location.replace("http://localhost:5000/users/login/google");
 
};
// post with formik 
const onSubmit=(data,actions)=>{
    
   
  axios.post("http://localhost:5000/users/user/login",data,{
    withCredentials: true,
  } ).then((response)=>{
    console.log("IT WORKEDDDD");
    console.log(response.data);
      
    if(response.data.error){/*alert(response.data.error) ; */notify();}
    else{
      
     console.log("Succes");
     setIsLoggedIn(true);
  
    }
    
  }).catch(error => {
    console.log(error,"ECHEC!");
  });
};
// *************************




     if (isLoggedIn) {
        // Rediriger l'utilisateur vers la page client après la connexion réussie
      return <Navigate to="/clientpage" />;
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
            <h2>Welcome Again to Evey Podcast</h2>
            <span >Don't have an account ? <a href='#'id="log">Sign Up now</a></span>
            <button className='google-link' id="googlebtn" onClick={redirectGoogle}>
                <img src={google} /> Continue with Google 
                </button>
            <h4>Or</h4>
           

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <label>Username</label>
               
                <ErrorMessage name="name" component="span" id="h"/>
                <Field  className='input-field' type ="text"   name="name" placeholder="title"  />
       
               
                <label>Password</label>
                <ErrorMessage name="password" component="span" id="h"/>
                <Field  className='input-field' type ="password"   name="password"  placeholder="Please enter your password"/>
               
                <label>Email Adress</label>

                <ErrorMessage name="email" component="span" id="h"/>
                <Field  className='input-field' type ="email"   name="email"  placeholder="Please enter your Email"/>
                 <div className='row'>
                    <input type="radio" />
                    <span> <Link to='/forgetPassword'>Forget my password?</Link></span>
                    
                   </div>
                <button  type="submit" >Login</button>
                </Form>
                </Formik>
        </div>
       </div>
      </div>
      < ToastContainer/>
       </section>
       

    )
}
export default Login;