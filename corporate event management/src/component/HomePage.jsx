import React from "react";
import '../assets/css/homepage.css';
import facebook from '../assets/css/images/facebook.jpg';
import youtube from '../assets/css/images/youtube.jpeg';
import linkedin from '../assets/css/images/linkedin.jpeg';
import insta from '../assets/css/images/insta.jpeg';
import homeintro from '../assets/css/images/homeintro.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import elite from '../assets/css/images/logo.png';
const HomePage = () => {
    return (
        <div className="homepage">
            <div className="header">
                <div className='navbar-sub'>
                    {/* <img id="image-57-6" alt="logo" src="https://eliteevents.in/wp-content/uploads/2023/12/logo3.png" class="ct-image" /> */}
                    <img id="imageelite" alt="logo" src={elite} class="ct-image" style={{marginTop:"20px",marginRight:"70px"}}/>
                    <a href="/home">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/services">Our Services</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contact">Contact Us</a>
                    <div className="profile-dropdown">
                        <AccountCircleIcon sx={{
                            fontSize: 40,
                            color: 'white'
                            }}/>
                                    <div className="dropdown-content">
                                        <a href="/my-profile">My Profile</a>
                                        <a href="/my-bookings">My Bookings</a>
                                        <a href="/">Logout</a>
                                    </div>
                    </div>
                </div>
                <div className="event_management">
                    <br></br>
                    <h1>Corporate Event Planning Services</h1>
                    <br></br>
                    <h3>We specialize in planning and managing corporate events,<br></br> award ceremonies, product launches, and press conferences for businesses.</h3>
                    <br></br>
                    <a href="/about"><button id='learn_more'>Learn More</button></a>
                </div>
            </div>
            <div className="intro">
                <img src={homeintro} alt="Corporate Event"></img>
                <div className="introwelcome">
                    <h5>Welcome to Elite Events</h5>
                    <h3>The premier agency for corporate event planning</h3>
                    <ul>
                        <li>We've established ourselves as masters of crafting unforgettable corporate event experiences. As we embark on an exciting new chapter of growth, our commitment to quality remains unwavering.</li>
                        <li>Our expertise spans corporate events, hospitality, and event planning, ensuring a memorable experience tailored to your unique business needs. Our team of seasoned professionals promises a stress-free, relaxed, and enjoyable journey from start to finish.</li>
                        <li>With 24/7 support, you can trust us to deliver seamless execution and unparalleled service. As your trusted corporate event planner, we're dedicated to helping you achieve excellence. Let us bring your vision to life!"</li>
                    </ul>
                </div>
            </div>
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>We specialize in planning corporate events, award ceremonies, product launches, and press conferences, tailored to your style, budget, and requirements. Your vision is our priority as we bring your event to life seamlessly and professionally.</p>
                </div>
                <div className="footer-section">
                    <div id="quicklink">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/services">Our Services</a></li>
                            <li><a href="/gallery">Gallery</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#facebook"><img src={facebook} alt="Facebook"></img></a>
                        <a href="#youtube"><img src={youtube} alt="Youtube"></img></a>
                        <a href="#instagram"><img src={insta} alt="Instagram"></img></a>
                        <a href="#linkedin"><img src={linkedin} alt="LinkedIn"></img></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 EliteEvents. All Rights Reserved.</p>
            </div>
        </div>
    )
}
export default HomePage;