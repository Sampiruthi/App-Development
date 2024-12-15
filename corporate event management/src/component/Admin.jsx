import React, { useEffect, useState } from 'react';
import '../assets/css/admin.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slide, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import elite from '../assets/css/images/logo.png';
const Admin = () => {
    const [events, setEvents] = useState([]);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = events.filter(event =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

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

    const handleClickOpenEdit = (event) => {
        setSelectedEvent(event);
        setEditedDescription(event.description);
        setEditedImageUrl(event.imageUrl);
        setOpenEditDialog(true);
    };

    const handleClose = () => {
        setOpenViewDialog(false);
        setOpenEditDialog(false);
        setSelectedEvent(null);
    };
    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:8080/api/events/put/${selectedEvent.eventId}`, {
                description: editedDescription,
                imageUrl: editedImageUrl
            });
            setEvents(events.map(event =>
                event.eventId === selectedEvent.eventId
                    ? { ...event, description: editedDescription, imageUrl: editedImageUrl }
                    : event
            ));
            handleClose();
            showSnackbar('Event edited successfully', 'success');
        } catch (error) {
            console.error('Error updating event:', error);
            showSnackbar('Error updating event', 'error');
        }
    };
    const handleDeleteClick = (event) => {
        if (event) {
            handleDeleteEvent(event);
        } else {
            showSnackbar('No event selected for deletion', 'error');
        }
    };

    const handleDeleteEvent = async (event) => {
        try {
            await axios.delete(`http://localhost:8080/api/events/delete/${event.eventId}`);
            setEvents(prevEvents => prevEvents.filter(e => e.eventId !== event.eventId));
            showSnackbar('Event deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting event:', error);
            showSnackbar('Error deleting event', 'error');
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
                        <AccountCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                        <div className="adropdown-content">
                            <a href="/">Logout</a>
                        </div>
                    </div>
                </div>
                <div className="common">
                    <h1>Admin Dashboard ~ Events</h1>
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
                            <Card key={event.eventId} className="event-card">
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={event.imageUrl}
                                    onClick={() => handleClickOpenView(event)}
                                    className='event-image'
                                    style={{ cursor: 'pointer' }}
                                />
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        <b>{event.eventName}</b>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClickOpenEdit(event)}>Edit</Button>
                                    <Button size="small" onClick={() => handleDeleteClick(event)}>Delete</Button>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" style={{ padding: '20px', textAlign: 'center' }}>
                            No results found
                        </Typography>
                    )}
                    <div className="add-icon-container">
                        <AddCircleIcon
                            className="add-icon"
                            sx={{ fontSize: 80, color: 'black', cursor: 'pointer' }}
                            onClick={() => window.location.href = '/addevent'}
                        />
                    </div>
                </div>
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
                    </DialogActions>
                </Dialog>
            )}
            {selectedEvent && (
                <Dialog
                    open={openEditDialog}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            padding: '20px',
                            borderRadius: '8px',
                        },
                    }}
                    aria-describedby="edit-dialog-description"
                >
                    <DialogTitle style={{ padding: '16px' }}>
                        Edit Event
                    </DialogTitle>
                    <DialogContent style={{ padding: '20px' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            style={{
                                marginBottom: '20px',
                                '& label.Mui-focused': {
                                    color: '#3f51b5',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#3f51b5',
                                },
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Image URL"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editedImageUrl}
                            onChange={(e) => setEditedImageUrl(e.target.value)}
                            style={{
                                marginBottom: '20px',
                                '& label.Mui-focused': {
                                    color: '#3f51b5',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#3f51b5',
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'flex-end', padding: '16px' }}>
                        <Button onClick={handleClose} style={{ color: '#3f51b5' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges} style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Admin;