import React, { useState } from "react";
import '../assets/css/addevent.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import elite from '../assets/css/images/logo.png';
const AddVenue = () => {
    const navigate=useNavigate();
    const [data, setData] = useState({
        venueName: "",
        location : "",
        description: "",
        totalPackage: "",
        participantCount: "",
        imageUrl:""
    });
    const [error, setError] = useState({
        venueName: "",
        location: "",
        description: "",
        totalPackage: "",
        participantCount: "",
        imageUrl:""
    });

    const handleType = (e) => {
        const value = e.target.value;
        setData({ ...data, venueName: value });
        setError({ ...error, venueName: value ? "" : "Venue Name is required" });
    }
    const handleVenue = (e) => {
        const value = e.target.value;
        setData({ ...data, location: value });
        setError({ ...error, location: value ? "" : "Location is required" });
    }

    const handleDesc = (e) => {
        const value = e.target.value;
        setData({ ...data, description: value });
        setError({ ...error, description: value ? "" : "Event Description is required" });
    }

    const handlePackage = (e) => {
        const value = e.target.value;
        setData({ ...data, totalPackage: value });
        setError({ ...error, totalPackage: value > 0 ? "" : "Total Package must be greater than zero" });
    }

    const handleCount = (e) => {
        const value = e.target.value;
        setData({ ...data, participantCount: value });
        setError({ ...error, participantCount: value >0 ? "" : "Participant Count must be greater than zero" });
    }

    const handleImageUrl = (e) => {
        const value = e.target.value;
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        setData({ ...data, imageUrl: value });
        setError({ ...error, imageUrl: urlPattern.test(value) ? "" : "Invalid URL" });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate(data)) {
            try {
                const response = await axios.post('http://localhost:8080/api/venues/post', data);
                console.log(data);
                if (response.status === 200) {
                    alert("Venue added successfully!");
                    navigate('/allvenue');
                }
            } catch (err) {
                console.error("Error adding event:", err);
                alert("There was an error adding the event. Please try again.");
            }
        }
    }
    const validate = (data) => {
        let isValid = true;
        let newErrors = {
            venueName: "",
            description: "",
            totalPackage: "",
            participantCount: "",
            imageUrl : ""
        };
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        
        if (!data.venueName) {
            isValid = false;
            newErrors.venueName = "Venue Name is required";
        }
        if (!data.location) {
            isValid = false;
            newErrors.location = "Location is required";
        }

        if (!data.description) {
            isValid = false;
            newErrors.description = "Venue Description is required";
        }

        if (!data.totalPackage) {
            isValid = false;
            newErrors.tpackage = "Total Package is required";
        }
        else if(data.totalPackage <= 0)
        {
            isValid = false;
            newErrors.totalPackage = "Total Package should be greater than zero";

        }
        if (!data.participantCount) {
            isValid = false;
            newErrors.participantCount = "Maximum Participant Count is required";
        }
        else if(data.participantCount <=0 )
        {
            isValid = false;
            newErrors.participantCount = "Maximum Participant Count must be greater than zero";

        }        
        if(!data.imageUrl)
        {
            isValid = false;
            newErrors.imageUrl = "URL is required";
        }
        else if (!urlPattern.test(data.imageUrl)) {
            isValid = false;
            newErrors.imageUrl = "Invalid URL";
        }
        setError(newErrors);
        return isValid;
    }

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
                            }}/>
                                    <div className="adropdown-content">
                                        <a href="/">Logout</a>
                                    </div>
                    </div>
                </div>
                <div className="common">
                    <h1>Add Venue</h1>
                </div>
            </div>
            <div className="eventform">
                <form type="submit" className="addeveform" onSubmit={handleSubmit}>
                    <h2>Add Venue</h2>
                    <div className="type">
                        <label htmlFor="venueName">Venue Name</label>
                        <input type="text" id="venueName" onChange={handleType}></input>
                        {error.venueName && <p className="error">{error.venueName}</p>}
                    </div>
                    <div className="type">
                        <label htmlFor="location">Venue Location</label>
                        <input type="text" id="location" onChange={handleVenue}></input>
                        {error.location && <p className="error">{error.location}</p>}
                    </div>
                    <div className="desc">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" onChange={handleDesc}></textarea>
                        {error.description && <p className="error">{error.description}</p>}
                    </div>
                    <div className="package">
                        <label htmlFor="totalPackage">Total Package</label>
                        <input type="number" id="totalPackage" onChange={handlePackage}></input>
                        {error.totalPackage && <p className="error">{error.totalPackage}</p>}
                    </div>
                    <div className="count">
                        <label htmlFor="participantCount">Maximum Participants</label>
                        <input type="number" id="participantCount" onChange={handleCount}></input>
                        {error.participantCount && <p className="error">{error.participantCount}</p>}
                    </div>
                    <div className="image-url">
                        <label htmlFor="imageUrl">Image-url</label>
                        <input type="text" id="imageUrl" onChange={handleImageUrl}></input>
                        {error.imageUrl && <p className="error">{error.imageUrl}</p>}
                    </div>
                    <Button type="submit">Add Venue</Button>
                </form>
            </div>
        </div>
    )
}

export default AddVenue;
