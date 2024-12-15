import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/about.css';
import facebook from '../assets/css/images/facebook.jpg';
import youtube from '../assets/css/images/youtube.jpeg';
import insta from '../assets/css/images/insta.jpeg';
import linkedin from '../assets/css/images/linkedin.jpeg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import elite from '../assets/css/images/logo.png';
const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [notification, setNotification] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/get/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings data:', error);
            }
        };

        if (userId) {
            fetchBookings();
        }
    }, [userId]);

    const handleDeleteClick = async (id,paymentStatus) => {
        try {
            await axios.delete(`http://localhost:8080/api/bookings/delete/${id}`);
            const updatedBookings = bookings.filter(booking => booking.id !== id);
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
        if(paymentStatus === 'Paid')
        {
            setNotification('You amount will be refunded within 5 days');
        }
        else
        {
            setNotification('Your booking has been cancelled');
        }
    };

    const navigate = useNavigate();
    const handlePayNowClick = (id, paymentStatus) => {
        if (paymentStatus === 'Paid') {
            setNotification('You have already paid');
        } else {
            console.log(`Initiating payment for booking id: ${id}`);
            localStorage.setItem("bookingId", id);
            navigate("/payment");
        }
    };

    const handleCloseNotification = () => {
        setNotification(null);
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
                        }} />
                        <div className="cdropdown-content">
                            <a href="/my-profile">My Profile</a>
                            <a href="/my-bookings">My Bookings</a>
                            <a href="/">Logout</a>
                        </div>
                    </div>
                </div>
                <div className="common">
                    <h1>My Bookings</h1>
                </div>
            </div>
            <div className="cards">
                {bookings.map((booking) => (
                    <div className="booking-card" key={booking.id}>
                        <h1>{booking.eventName}</h1>
                        <p>Organizer: {booking.name}</p>
                        <p>Email: {booking.email}</p>
                        <p>Company: {booking.company}</p>
                        <p>Venue: {booking.venue}</p>
                        <p>Cuisine: {booking.cuisine}</p>
                        <p>Event Date: {booking.date}</p>
                        <p>Start Time: {booking.startTime}</p>
                        <p>End Time: {booking.endTime}</p>
                        <p>Number of Attendees: {booking.attendees}</p>
                        <p>Total Package: {booking.fullPackage}</p>
                        <p>Payment Status : {booking.paymentStatus}</p>
                        <div className="button-group" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <Button
                                size="small"
                                variant='contained'
                                onClick={() => handleDeleteClick(booking.id,booking.paymentStatus)}
                                sx={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#d32f2f',
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="small"
                                variant='contained'
                                onClick={() => handlePayNowClick(booking.id, booking.paymentStatus)}
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#45a049',
                                    }
                                }}
                            >
                                Pay Now
                            </Button>
                        </div>
                    </div>
                ))}
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
                        <a href="#facebook"><img src={facebook} alt="Facebook" /></a>
                        <a href="#youtube"><img src={youtube} alt="YouTube" /></a>
                        <a href="#instagram"><img src={insta} alt="Instagram" /></a>
                        <a href="#linkedin"><img src={linkedin} alt="LinkedIn" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 EliteEvents. All Rights Reserved.</p>
            </div>

            {/* Notification Snackbar */}
            <Snackbar
                open={Boolean(notification)}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <Alert onClose={handleCloseNotification} severity="info">
                    {notification}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default MyBooking;
