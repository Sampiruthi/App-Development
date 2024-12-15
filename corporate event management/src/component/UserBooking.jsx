import React, { useContext, useEffect, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/userbooking.css';
import facebook from '../assets/css/images/facebook.jpg';
import youtube from '../assets/css/images/youtube.jpeg';
import insta from '../assets/css/images/insta.jpeg';
import linkedin from '../assets/css/images/linkedin.jpeg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import elite from '../assets/css/images/logo.png';
const UserBooking = () => {
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { selectedEvent, selectedVenue, selectedCuisine } = useContext(BookingContext);
    const [fullPackage, setFullPackage] = useState(0);
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        const storedUserId = JSON.parse(localStorage.getItem('userId'));
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        if (selectedVenue && selectedCuisine) {
          const venuePackage = parseFloat(selectedVenue.totalPackage);
          const cuisinePackagePrice = parseFloat(selectedCuisine.packagePrice);

          if (!isNaN(venuePackage) && !isNaN(cuisinePackagePrice)) {
            const total = venuePackage + cuisinePackagePrice;
            console.log('Total Package:', total);
            setFullPackage(total);
          } else {
            console.log('Error: Invalid package prices');
            setFullPackage(0);
          }
        } else {
          console.log('Error: Selected venue or cuisine is null');
          setFullPackage(0);
        }
      }, [selectedVenue, selectedCuisine]);
    const validateForm = (data) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.name) {
            errors.name = 'Name is required';
        } else if (data.name.length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        }

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Email is not valid';
        }

        if (!data.company) errors.company = 'Company is required';
        if (!data.attendees) errors.attendees = 'Number of attendees is required';
        if (data.attendees > selectedVenue?.participantCount) {
            errors.attendees = 'Number of attendees should be less than Participant Count';
        }
        if (!data.date) {
            errors.date = 'Event date is required';
        } else {
            const currentDate = new Date();
            const inputDate = new Date(data.date);
            if (inputDate <= currentDate) {
                errors.date = 'Event date must be after the current date';
            }
        }
        if (!data.startTime) errors.startTime = 'Start time is required';
        if (!data.endTime) errors.endTime = 'End time is required';

        if (data.startTime && data.endTime && data.startTime >= data.endTime) {
            errors.endTime = 'End time must be after start time';
        }

        return errors;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formData = {
            userId: userId,
            name: data.get('name'),
            email: data.get('email'),
            company: data.get('company'),
            venue: selectedVenue?.venueName,
            eventName: selectedEvent?.eventName,
            cuisine: selectedCuisine?.cuisineName,
            date: data.get('date'),
            startTime: data.get('startTime'),
            endTime: data.get('endTime'),
            attendees: data.get('attendees'),
            fullPackage: fullPackage,
            requests: data.get('requests'),
            paymentStatus: 'Pending'
        };
        console.log(formData);
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            setFormErrors({});
            try {
                const response = await axios.post('http://localhost:8080/api/bookings/post', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(userId);
                if (response.status === 200) {
                    console.log('Booking created:', response.data);
                    alert("Your booking is successful.");
                    navigate('/my-bookings');
                } else {
                    console.error('Failed to create booking');
                    alert('Booking creation failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
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
                    <h1>Booking</h1>
                </div>
            </div>
            <div className="booking-main">
                <div className="booking-content">
                    <h2>Booking for {selectedEvent?.eventName || 'Unknown Event'}</h2>
                    <div className="image-container">
                        <img src={selectedEvent?.imageUrl || 'default-image-url'} alt={selectedEvent?.eventName || 'Event'}
                            className="booking-image"
                            style={{ width: '250px', height: '200px' }} />
                    </div>
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" onChange={handleInputChange} />
                            {formErrors.name && <span className="error">{formErrors.name}</span>}
                        </label>
                        <label>
                            Email:
                            <input type="text" name="email" onChange={handleInputChange} />
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </label>
                        <label>
                            Company:
                            <input type="text" name="company" onChange={handleInputChange} />
                            {formErrors.company && <span className="error">{formErrors.company}</span>}
                        </label>
                        <label>
                            Event Name:
                            <input type="text" name="eventName" value={selectedEvent?.eventName || ''} disabled />
                        </label>
                        <label>
                            Venue:
                            <input type="text" name="venue" value={selectedVenue?.venueName || ''} disabled />
                        </label>
                        <label>
                            Cuisine:
                            <input type="text" name="cuisine" value={selectedCuisine?.cuisineName || ''} disabled />
                        </label>
                        <label>
                            Event Date:
                            <input type="date" name="date" onChange={handleInputChange} />
                            {formErrors.date && <span className="error">{formErrors.date}</span>}
                        </label>
                        <label>
                            Start Time:
                            <input type="time" name="startTime" onChange={handleInputChange} />
                            {formErrors.startTime && <span className="error">{formErrors.startTime}</span>}
                        </label>
                        <label>
                            End Time:
                            <input type="time" name="endTime" onChange={handleInputChange} />
                            {formErrors.endTime && <span className="error">{formErrors.endTime}</span>}
                        </label>
                        <label>
                            Number of Attendees:
                            <input type="number" name="attendees" onChange={handleInputChange} />
                            {formErrors.attendees && <span className="error">{formErrors.attendees}</span>}
                        </label>
                        <label>
                            Total Package:
                            <input type="number" name="package" value={fullPackage} disabled />
                        </label>
                        <label>
                            Special Requests:
                            <textarea name="requests"></textarea>
                        </label>
                        <button type="submit">Book Now</button>
                    </form>
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
                        <a href="#facebook"><img src={facebook} alt="Facebook" style={{ width: '30px', height: '30px' }} /></a>
                        <a href="#youtube"><img src={youtube} alt="Youtube" style={{ width: '30px', height: '30px' }} /></a>
                        <a href="#instagram"><img src={insta} alt="Instagram" style={{ width: '30px', height: '30px' }} /></a>
                        <a href="#linkedin"><img src={linkedin} alt="LinkedIn" style={{ width: '30px', height: '30px' }} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 EliteEvents. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default UserBooking;