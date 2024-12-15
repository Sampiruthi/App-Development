import React, { useState } from 'react';
import youtube from '../assets/css/images/youtube.jpeg';
import facebook from '../assets/css/images/facebook.jpg';
import insta from '../assets/css/images/insta.jpeg';
import linkedin from '../assets/css/images/linkedin.jpeg';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import '../assets/css/contact.css';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import elite from '../assets/css/images/logo.png';
const Contact = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        fullname: "",
        email: "",
        enquiry: ""
    });

    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value });
    };
    const handleName = (e) => {
        setData({ ...data, fullname: e.target.value });
    };
    const handleEnquiry = (e) => {
        setData({ ...data, enquiry: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(data)) {
            alert("Form submitted successfully!");
            window.location.reload();
            setError("");
        } 
    };

    const validate = (e) => {
        let isValid = true;
        let errormsg = "";
        const emailregex = /\S+@\S+\.\S+/;

        if (!e.email && !e.fullname && !e.enquiry) {
            isValid = false;
            errormsg = "The fields are empty. Kindly fill them.";
        } 
        else if ((!e.email && !e.fullname) || (!e.fullname && !e.enquiry) || (!e.email && !e.enquiry)) {
            isValid = false;
            errormsg = "Two fields are empty. Kindly fill them.";
        } 
        else if (!e.email) {
            isValid = false;
            errormsg = "Email is required.";
        } 
        else if (!e.enquiry) {
            isValid = false;
            errormsg = "Enquiry is required.";
        } 
        else if (!e.fullname) {
            isValid = false;
            errormsg = "Fullname is required.";
        } 
        else if (!emailregex.test(e.email)) {
            isValid = false;
            errormsg = "Email is invalid.";
        }

        setError(errormsg);
        return isValid;
    };

    return (
        <div>
            <div className="cheader">
                <div className='cnavbar-sub'>
                    {/* <img id="image-57-6" alt="logo" src="https://eliteevents.in/wp-content/uploads/2023/12/logo3.png" className="ct-image" /> */}
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
                    <h1>Contact Us</h1>
                </div>
            </div>
            <div className='contact'>
                <div className='address'>
                    <BusinessTwoToneIcon />
                    <p>13, Nehru Street,<br />Kuniyamuthur,<br />Coimbatore - 641008</p>
                </div>
                <div className='phone'>
                    <PhoneTwoToneIcon />
                    <p>Main Office: 1234567892</p>
                    <p>Customer Support: 1234567892</p>
                </div>
                <div className='mail'>
                    <EmailTwoToneIcon />
                    <p>contact@corporateevents.com</p>
                    <p>contact@customersupport.com</p>
                </div>
            </div>
            <div className='form'>
                <form className='contactform' onSubmit={handleSubmit}>
                    <h3>Enquiry</h3>
                    <div className='fullname'>
                        <label htmlFor='fullname'>Full Name</label>
                        <input type='text' onChange={handleName}></input>
                    </div>
                    <div className='email'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' onChange={handleEmail}></input>
                    </div>
                    <div className='enquiry'>
                        <label htmlFor='enquiry'>Enquiry</label>
                        <input type='text' onChange={handleEnquiry}></input>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <Button variant='contained' type="submit">Send</Button>
                </form>
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
                    <div className="social-icons">
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
    );
};

export default Contact;
