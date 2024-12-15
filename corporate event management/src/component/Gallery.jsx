import React from "react";
import '../assets/css/about.css'
import facebook from '../assets/css/images/facebook.jpg';
import youtube from '../assets/css/images/youtube.jpeg';
import insta from '../assets/css/images/insta.jpeg';
import linkedin from '../assets/css/images/linkedin.jpeg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import elite from '../assets/css/images/logo.png';
const Gallery = () => {
    return (
        <div>
            <div className="cheader">
                <div className='cnavbar-sub'>
                    {/* <img id="image-57-6" alt="logo" src="https://eliteevents.in/wp-content/uploads/2023/12/logo3.png" class="ct-image" /> */}
                    <img id="imageelite" alt="logo" src={elite} class="ct-image" style={{marginTop:"20px",marginRight:"70px"}}/>
                    <a href="/home">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/services">Our Services</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contact">Contact Us</a>
                    <div className="cprofile-dropdown">
                        <AccountCircleIcon sx={{
                            fontSize: 40,
                            color: 'white'
                            }}/>
                                    <div className="cdropdown-content">
                                        <a href="/my-profile">My Profile</a>
                                        <a href="/my-bookings">My Bookings</a>
                                        <a href="/">Logout</a>
                                    </div>
                    </div>
                </div>
                <div className="common">
                    <h1>Gallery</h1>
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
export default Gallery;