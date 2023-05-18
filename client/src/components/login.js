import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Header from "./header";
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../lib/style/log.css';
import evey from '../lib/img/evey.jpg';
import google from '../lib/img/google.png';
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login (){
  const navigate = useNavigate();
  const notify = (err) => {
    if(err=="USER BLOCKED"){ toast(`❌ ${err} Contact the administrateur ❌ `)}else{toast(`❌ ${err}`)};}
    
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [admin,setAdmin]=useState(false);

const initialValues={
  email:"",
  password :"",
 
};

const validationSchema=Yup.object().shape({
  email:Yup.string().required().email(),
  password:Yup.string().min(3,"Too short").required(),
 
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
  
    if(response.data.error){notify(response.data.error);}
    else if (response.data.errorblock){ navigate("/block");}
    else{
      if (response.data.role === 'admin') {
        // Rediriger l'utilisateur vers la page d'administration
        setAdmin(true);
      };
     
     console.log("Succes");

   

     setIsLoggedIn(true);
  
    }
    
  }).catch(error => {
    console.log(error,"ECHEC!");
  });
};
// *************************
/*if (isLoggedIn && admin) {
  // Rediriger l'utilisateur vers la page client après la connexion réussie
return <Navigate to="/clientpage" />;
}*/



if (isLoggedIn) {
  if (admin) {
    // Rediriger l'utilisateur vers la page d'administration
    return <Navigate to="/adminDashboard" />;
  } else {
    // Rediriger l'utilisateur vers la page client après la connexion réussie
   
    return <Navigate to="/clientpage" />;
  }
}

    return(
        <section>
       <Header/>
       <div className='containerlog'>
       <div className='signup-box'>
        <div className='col-1'>
            <img src='/background.jpg'/>
        </div>
        <div className='col-2'>
            <h2>Welcome back to Evey Podcast</h2>
            <span >Don't have an account ? <a href='#'id="log">Sign Up now</a></span>
            <button className='google-link' id="googlebtn" onClick={redirectGoogle}>
                <img src={google} /> Continue with Google 
                </button>
            <h4>Or</h4>
           

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>

                <label>Email Adress</label>

                <ErrorMessage name="email" component="span" id="h"/>
                <Field  className='input-field' type ="email"   name="email"  placeholder="Please enter your Email"/>
               
                <label>Password</label>
                <ErrorMessage name="password" component="span" id="h"/>
                <Field  className='input-field' type ="password"   name="password"  placeholder="Please enter your password"/>
               

                 <div className='row'>
                    {/*<input type="radio" />*/ }
                    <span> <Link to='/forgetPassword'>Forget my password ?</Link></span>
                    
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