import { Link } from "react-router-dom"

export default function Header() {
    return (
    <div>
    <header>
     <div>  
        <nav class="navbar">   
            <span className="logo"><img src='/logo.png' /></span>
            <span className="links">
                <Link to='/'>Home</Link>
                <Link to='/podcasts'>Podcasts</Link>
                <Link to='/Discover'>Discover</Link>
                <Link to='/sign-in' id="signinbutton">Log In</Link> 
                <Link to='/sign-up'id="signupbutton">Sign Up</Link>
            </span>   
        </nav>     
    </div>  

    </header>    
    </div>




    )
}