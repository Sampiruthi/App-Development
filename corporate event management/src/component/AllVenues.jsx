import React, { useEffect, useState } from 'react';
import '../assets/css/admin.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slide, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import elite from '../assets/css/images/logo.png';
const AllVenues = () => {
    const [venues, setVenues] = useState([]);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [editedVenueName, setEditedVenueName] = useState('');
    const [editedLocation, setEditedLocation] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedTotalPackage, setEditedTotalPackage] = useState('');
    const [editedParticipantCount, setEditedParticipantCount] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVenues = venues.filter(venue =>
        venue.venueName.toLowerCase().includes(searchQuery.toLowerCase())
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
        const fetchVenues = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/venues/getall');
                setVenues(response.data);
            } catch (error) {
                console.error('Error fetching venues:', error);
            }
        };

        fetchVenues();
    }, []);

    const handleClickOpenView = (venue) => {
        setSelectedVenue(venue);
        setOpenViewDialog(true);
    };

    const handleClickOpenEdit = (venue) => {
        setSelectedVenue(venue);
        setEditedVenueName(venue.venueName);
        setEditedLocation(venue.location);
        setEditedDescription(venue.description);
        setEditedTotalPackage(venue.totalPackage);
        setEditedParticipantCount(venue.participantCount);
        setEditedImageUrl(venue.imageUrl);
        setOpenEditDialog(true);
    };

    const handleClose = () => {
        setOpenViewDialog(false);
        setOpenEditDialog(false);
        setSelectedVenue(null);
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:8080/api/venues/put/${selectedVenue.id}`, {
                venueName: editedVenueName,
                location: editedLocation,
                description: editedDescription,
                totalPackage: editedTotalPackage,
                participantCount: editedParticipantCount,
                imageUrl: editedImageUrl
            });
            setVenues(venues.map(venue =>
                venue.id === selectedVenue.id
                    ? { ...venue, venueName: editedVenueName, location: editedLocation, description: editedDescription, totalPackage: editedTotalPackage, participantCount: editedParticipantCount, imageUrl: editedImageUrl }
                    : venue
            ));
            handleClose();
            showSnackbar('Venue edited successfully', 'success');
        } catch (error) {
            console.error('Error updating venue:', error);
            showSnackbar('Error updating venue', 'error');
        }
    };

    const handleDeleteClick = (venue) => {
        if (venue) {
            handleDeleteVenue(venue);
        } else {
            showSnackbar('No venue selected for deletion', 'error');
        }
    };

    const handleDeleteVenue = async (venue) => {
        try {
            await axios.delete(`http://localhost:8080/api/venues/delete/${venue.id}`);
            setVenues(prevVenues => prevVenues.filter(v => v.id !== venue.id));
            showSnackbar('Venue deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting venue:', error);
            showSnackbar('Error deleting venue', 'error');
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
                    <h1>Admin Dashboard ~ Venues</h1>
                </div>
            </div>
            <div className='eventlist'>
                <div>
                    <h3>Venue Lists</h3>
                </div>
                <div className="aour_event">
                    <input
                        type="text"
                        placeholder="Search Venues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className='cards'>
                    {filteredVenues.length > 0 ? (
                        filteredVenues.map((venue) => (
                            <Card key={venue.id} className="event-card">
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={venue.imageUrl}
                                    onClick={() => handleClickOpenView(venue)}
                                    className='event-image'
                                    style={{ cursor: 'pointer' }}
                                />
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        <b>{venue.venueName}</b>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClickOpenEdit(venue)}>Edit</Button>
                                    <Button size="small" onClick={() => handleDeleteClick(venue)}>Delete</Button>
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
                            onClick={() => window.location.href = '/addvenue'}
                        />
                    </div>
                </div>
            </div>
            {selectedVenue && (
                <Dialog
                    open={openViewDialog}
                    TransitionComponent={(props) => <Slide direction="up" {...props} />}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle><h2>{selectedVenue.venueName}</h2></DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" component="div">
                            <strong>Description:</strong> {selectedVenue.description}
                        </Typography>
                        <Typography variant="body1" component="div">
                            <strong>Location:</strong> {selectedVenue.location}
                        </Typography>
                        <Typography variant="body1" component="div">
                            <strong>Total Package:</strong> &#8377;{selectedVenue.totalPackage}
                        </Typography>
                        <Typography variant="body1" component="div">
                            <strong>Participant Count:</strong> {selectedVenue.participantCount}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {selectedVenue && (
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
                        Edit Venue
                    </DialogTitle>
                    <DialogContent style={{ padding: '20px' }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Venue Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editedVenueName}
                            onChange={(e) => setEditedVenueName(e.target.value)}
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
                            label="Location"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={editedLocation}
                            onChange={(e) => setEditedLocation(e.target.value)}
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
                            label="Total Package"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={editedTotalPackage}
                            onChange={(e) => setEditedTotalPackage(e.target.value)}
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
                            label="Participant Count"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={editedParticipantCount}
                            onChange={(e) => setEditedParticipantCount(e.target.value)}
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

export default AllVenues;
