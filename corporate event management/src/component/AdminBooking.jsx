import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/adminbooking.css';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import elite from '../assets/css/images/logo.png';
const AdminBooking = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/bookings/getall');
                console.log(response.data);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings data:', error);
            }
        };

        fetchBookings();
    }, []);

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/bookings/delete/${id}`);
            const updatedBookings = bookings.filter(booking => booking.id !== id);
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div>
            <div className="aheader">
                <div className='anavbar-sub'>
                    {/* <img id="image-57-6" alt="logo" src="https://eliteevents.in/wp-content/uploads/2023/12/logo3.png" className="ct-image" /> */}
                    <img id="imageelite" alt="logo" src={elite} class="ct-image" style={{marginTop:"20px",marginRight:"70px"}}/>
                    <a href="/user">Events</a>
                    <a href="/allvenue">Venues</a>
                    <a href="/allcuisines">Cuisines</a>
                    <a href="/booking">Bookings</a>
                    <div className="aprofile-dropdown">
                        <AccountCircleIcon sx={{
                            fontSize: 40,
                            color: 'white'
                        }} />
                        <div className="adropdown-content">
                            <a href="/">Logout</a>
                        </div>
                    </div>
                </div>
                <div className="common">
                    <h1>Admin Dashboard ~ Bookings</h1>
                </div>
            </div>
            <div className="cards">
                {bookings.map((booking) => (
                    <Card className="booking-card" key={booking.id}>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                Booking ID: {booking.id}
                            </Typography>
                            <Typography variant="body1">
                                Organizer ID: {booking.userId}
                            </Typography>
                            <Typography variant="body1">
                                Organizer: {booking.name}
                            </Typography>
                            <Typography variant="body1">
                                Email: {booking.email}
                            </Typography>
                            <Typography variant="body1">
                                Company: {booking.company}
                            </Typography>
                            <Typography variant="body1">
                                Event Name: {booking.eventName}
                            </Typography>
                            <Typography variant="body1">
                                Venue: {booking.venue}
                            </Typography>
                            <Typography variant="body1">
                                Cuisine: {booking.cuisine}
                            </Typography>
                            <Typography variant="body1">
                                Event Date: {booking.date}
                            </Typography>
                            <Typography variant="body1">
                                Start Time: {booking.startTime}
                            </Typography>
                            <Typography variant="body1">
                                End Time: {booking.endTime}
                            </Typography>
                            <Typography variant="body1">
                                Number of Attendees: {booking.attendees}
                            </Typography>
                            <Typography variant="body1">
                                Total Package: {booking.fullPackage}
                            </Typography>
                            <Typography variant="body1">
                                Payment Status: {booking.paymentStatus}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleDeleteClick(booking.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminBooking;
