import React, { useContext, useEffect, useState } from 'react';
import '../assets/css/admin.css';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import facebook from '../assets/css/images/facebook.jpg';
import youtube from '../assets/css/images/youtube.jpeg';
import insta from '../assets/css/images/insta.jpeg';
import linkedin from '../assets/css/images/linkedin.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import elite from '../assets/css/images/logo.png';
const Services = () => {
    const [events, setEvents] = useState([]);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const { selectedEvent,setSelectedEvent } = useContext(BookingContext);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events/getall');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleClickOpenView = (event) => {
        setSelectedEvent(event);
        setOpenViewDialog(true);
    };

    const handleClose = () => {
        setOpenViewDialog(false);
        setSelectedEvent(null);
    };

    const handleBook = () => {
        navigate("/venue");
    };

    return (
        <div>
            <div className="cheader">
                <div className='cnavbar-sub'>
                    <img id="imageelite" alt="logo" src={elite} class="ct-image" style={{marginTop:"20px",marginRight:"70px"}}/>
                    <a href="/home">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/services">Our Services</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/contact">Contact Us</a>
                    <div className="cprofile-dropdown">
                        <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                        <div className="cdropdown-content">
                            <a href="/my-profile">My Profile</a>
                            <a href="/my-bookings">My Bookings</a>
                            <a href="/">Logout</a>
                        </div>
                    </div>
                </div>
                <div className="common">
                    <h1>Our Services</h1>
                </div>
            </div>
            <div className='eventlist'>
                <div>
                    <h3>Event Lists</h3>
                </div>
                <div className="aour_event">
                    <input
                        type="text"
                        placeholder="Search Events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className='cards'>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <Box
                                key={event.eventId}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: 300, 
                                    height: 250,
                                    marginBottom: 2,
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0px 8px 16px rgba(0,0,0,0.2)'
                                    }
                                }}
                                onClick={() => handleClickOpenView(event)}
                            >
                                <Box
                                    component="img"
                                    src={event.imageUrl}
                                    alt={event.eventName}
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box sx={{ padding: 2, flexGrow: 1 }}>
                                    <Typography variant="body1" component="div">
                                        <b>{event.eventName}</b>
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1" style={{ padding: '20px', textAlign: 'center' }}>
                            No results found
                        </Typography>
                    )}
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
            {selectedEvent && (
                <Dialog
                    open={openViewDialog}
                    TransitionComponent={(props) => <Slide direction="up" {...props} />}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{selectedEvent.eventName}</DialogTitle>
                    <DialogContent>
                        <Typography id="alert-dialog-slide-description">
                            {selectedEvent.description}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleBook}>Choose Venue</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default Services;
