import { Link } from "react-router-dom"

export default function Header() {
<<<<<<< Updated upstream
=======
//<Link to='/Discover'>Discover</Link>
>>>>>>> Stashed changes
    return (
    <div>
    <header>
     <div>  
        <nav class="navbar">   
            <span className="logo"><img src='/logo.png' /></span>
            <span className="links">
                <Link to='/'>Home</Link>
                <Link to='/podcasts'>Podcasts</Link>
<<<<<<< Updated upstream
                <Link to='/Discover'>Discover</Link>
=======
                <Link to='/clientpage'>Discover</Link>
                <SearchBar/> 
>>>>>>> Stashed changes
                <Link to='/sign-in' id="signinbutton">Log In</Link> 
                <Link to='/sign-up'id="signupbutton">Sign Up</Link>
            </span>   
        </nav>     
    </div>  

    </header>    
    </div>




    )
}