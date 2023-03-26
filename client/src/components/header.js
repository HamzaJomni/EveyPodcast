import { Link } from "react-router-dom"
import SearchBar from './search_bar';



export default function Header() {

    return (
    <div>
    <header>
     <div>  
        <nav className="navbar">   
            <span className="logo"><img src='/logo.png' alt="evey_logo" /></span>
            <span className="links">
                <Link to='/'>Home</Link>
                <Link to='/podcasts'>Podcasts</Link>
                <Link to='/newPodcast'>Discover</Link>
                <SearchBar/> 
                <Link to='/sign-in' id="signinbutton">Log In</Link> 
                <Link to='/sign-up'id="signupbutton">Sign Up</Link>
            </span>   
        </nav> 
         
    </div>  

    </header>    
    </div>
    )
}