import React, { useState } from "react";
import '../assets/css/addevent.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import elite from '../assets/css/images/logo.png';
const Addevent = () => {
    const navigate=useNavigate();
    const [data, setData] = useState({
        eventName: "",
        description: "",
        imageUrl:""
    });
    const [error, setError] = useState({
        eventName: "",
        description: "",
        imageUrl:""
    });

    const handleType = (e) => {
        const value = e.target.value;
        setData({ ...data, eventName: value });
        setError({ ...error, eventName: value ? "" : "Event Name is required" });
    }

    const handleDesc = (e) => {
        const value = e.target.value;
        setData({ ...data, description: value });
        setError({ ...error, description: value ? "" : "Event Description is required" });
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
                const response = await axios.post('http://localhost:8080/api/events/post', data);
                console.log(data);
                if (response.status === 200) {
                    alert("Event added successfully!");
                    navigate('/user');
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
            eventType: "",
            desc: "",
            imageUrl : ""
        };
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        
        if (!data.eventName) {
            isValid = false;
            newErrors.eventType = "Event Name is required";
        }

        if (!data.description) {
            isValid = false;
            newErrors.desc = "Event Description is required";
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
                    <h1>Add Event</h1>
                </div>
            </div>
            <div className="eventform">
                <form type="submit" className="addeveform" onSubmit={handleSubmit}>
                    <h2>Add Event</h2>
                    <div className="type">
                        <label htmlFor="type">Event Name</label>
                        <input type="text" id="type" onChange={handleType}></input>
                        {error.eventType && <p className="error">{error.eventType}</p>}
                    </div>
                    <div className="desc">
                        <label htmlFor="desc">Description</label>
                        <textarea id="desc" onChange={handleDesc}></textarea>
                        {error.desc && <p className="error">{error.desc}</p>}
                    </div>
                    <div className="image-url">
                        <label htmlFor="image-url">Image-url</label>
                        <input type="text" id="image-url" onChange={handleImageUrl}></input>
                        {error.imageUrl && <p className="error">{error.imageUrl}</p>}
                    </div>
                    <Button type="submit">Add Event</Button>
                </form>
            </div>
        </div>
    )
}

export default Addevent;
