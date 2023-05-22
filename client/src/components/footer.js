import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <footer> 
                <section className="footer_section"> 

                    <div className="footer_left_side">
                        <img src='/logo_white.jpg' id="logo_footer"/>
                        <p>
                            A unique platform to listen to original podcasts, and
                            focus on important or current topics, and not only
                            that, you can import your own podcasts and that will
                            be available to all users of the platform !
                            So don't wait to make a name for yourself, and make
                            your podcasts stand out.
                        </p>
                        <span className="footer_reseau_sociaux">
                        <a href="https://www.facebook.com/eveytechnologies"><img src='/fb_vert.jpg' /></a>
                        <a href="https://www.instagram.com/eveytechnologies/"><img src='/insta_vert.jpg' /></a>
                        <a href="https://www.linkedin.com/company/evey-technologies/"><img src='/linkedin_vert.jpg' /></a>
                        <a href="https://www.youtube.com/channel/UCYwSBG5ErVJUzLFQ-P4K6FA"><img src='/youtube_vert.jpg' /></a>
                        
                            
                        </span>
                        <div className="copyright">Copyright © 2023 Evey technologies. all rights reserved.</div>
                    </div>
                    <span className="useful_links">
                        <h3>Useful links</h3>
                        <Link to='/'>Home</Link>
                        <Link to='/podcasts'>All Podcasts</Link>
                        <Link to='/Contact-Us'>Contact Us</Link>
                    </span>
                    <span className="account_links">
                        <h3>Your Account</h3>
                        <Link to='/sign-up'>Register</Link>
                        <Link to='/sign-in'>Log in</Link>
                       
                    </span>

                </section> 
            </footer>     
        </>

)
}