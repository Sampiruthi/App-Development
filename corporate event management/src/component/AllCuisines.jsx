import React, { useEffect, useState } from 'react';
import '../assets/css/admin.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slide, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import elite from '../assets/css/images/logo.png';
const AllCuisines = () => {
    const [cuisines, setCuisines] = useState([]);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCuisine, setSelectedCuisine] = useState(null);
    const [editedCuisineName, setEditedCuisineName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPackage, setEditedPackage] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCuisines = cuisines.filter(cuisine =>
        cuisine.cuisineName.toLowerCase().includes(searchQuery.toLowerCase())
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
        const fetchCuisines = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cuisines/getall');
                setCuisines(response.data);
            } catch (error) {
                console.error('Error fetching cuisines:', error);
            }
        };

        fetchCuisines();
    }, []);

    const handleClickOpenView = (cuisine) => {
        setSelectedCuisine(cuisine);
        setOpenViewDialog(true);
    };

    const handleClickOpenEdit = (cuisine) => {
        setSelectedCuisine(cuisine);
        setEditedCuisineName(cuisine.cuisineName);
        setEditedDescription(cuisine.description);
        setEditedPackage(cuisine.packagePrice);
        setEditedImageUrl(cuisine.imageUrl);
        setOpenEditDialog(true);
    };

    const handleClose = () => {
        setOpenViewDialog(false);
        setOpenEditDialog(false);
        setSelectedCuisine(null);
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:8080/api/cuisines/put/${selectedCuisine.id}`, {
                cuisineName: editedCuisineName,
                description: editedDescription,
                packagePrice: editedPackage,
                imageUrl: editedImageUrl
            });
            setCuisines(cuisines.map(cuisine =>
                cuisine.id === selectedCuisine.id
                    ? { ...cuisine, cuisineName: editedCuisineName, description: editedDescription, package: editedPackage, imageUrl: editedImageUrl }
                    : cuisine
            ));
            handleClose();
            showSnackbar('Cuisine edited successfully', 'success');
        } catch (error) {
            console.error('Error updating cuisine:', error);
            showSnackbar('Error updating cuisine', 'error');
        }
    };

    const handleDeleteClick = (cuisine) => {
        if (cuisine) {
            handleDeleteCuisine(cuisine);
        } else {
            showSnackbar('No cuisine selected for deletion', 'error');
        }
    };

    const handleDeleteCuisine = async (cuisine) => {
        try {
            await axios.delete(`http://localhost:8080/api/cuisines/delete/${cuisine.id}`);
            setCuisines(prevCuisines => prevCuisines.filter(c => c.id !== cuisine.id));
            showSnackbar('Cuisine deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting cuisine:', error);
            showSnackbar('Error deleting cuisine', 'error');
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
                    <h1>Admin Dashboard ~ Cuisines</h1>
                </div>
            </div>
            <div className='eventlist'>
                <div>
                    <h3>Cuisine List</h3>
                </div>
                <div className="aour_event">
                    <input
                        type="text"
                        placeholder="Search Cuisines..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className='cards'>
                    {filteredCuisines.length > 0 ? (
                        filteredCuisines.map((cuisine) => (
                            <Card key={cuisine.id} className="cuisine-card">
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={cuisine.imageUrl}
                                    onClick={() => handleClickOpenView(cuisine)}
                                    className='cuisine-image'
                                    style={{ cursor: 'pointer' }}
                                />
                                <CardContent>
                                    <Typography variant="body1" component="div">
                                        <b>{cuisine.cuisineName}</b>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClickOpenEdit(cuisine)}>Edit</Button>
                                    <Button size="small" onClick={() => handleDeleteClick(cuisine)}>Delete</Button>
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
                            onClick={() => window.location.href = '/addcuisine'}
                        />
                    </div>
                </div>
            </div>
            {selectedCuisine && (
                <Dialog
                    open={openViewDialog}
                    TransitionComponent={(props) => <Slide direction="up" {...props} />}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle><h2>{selectedCuisine.cuisineName}</h2></DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" component="div">
                            <strong>Description:</strong> {selectedCuisine.description}
                        </Typography>
                        <Typography variant="body1" component="div">
                            <strong>Package:</strong> &#8377;{selectedCuisine.packagePrice}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

{selectedCuisine && (
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
            Edit Cuisine
        </DialogTitle>
        <DialogContent style={{ padding: '20px' }}>
            <TextField
                autoFocus
                margin="dense"
                label="Cuisine Name"
                type="text"
                fullWidth
                variant="standard"
                value={editedCuisineName}
                onChange={(e) => setEditedCuisineName(e.target.value)}
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
                label="Package"
                type="number"
                fullWidth
                variant="standard"
                value={editedPackage}
                onChange={(e) => setEditedPackage(e.target.value)}
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

export default AllCuisines;
