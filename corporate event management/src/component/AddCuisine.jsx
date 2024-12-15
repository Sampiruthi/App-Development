import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import elite from '../assets/css/images/logo.png';
const AddCuisine = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        cuisineName: "",
        description: "",
        packagePrice: "",
        imageUrl: ""
    });
    const [error, setError] = useState({
        cuisineName: "",
        description: "",
        packagePrice: "",
        imageUrl: ""
    });

    const handleCuisineName = (e) => {
        const value = e.target.value;
        setData({ ...data, cuisineName: value });
        setError({ ...error, cuisineName: value ? "" : "Cuisine Name is required" });
    }

    const handleDesc = (e) => {
        const value = e.target.value;
        setData({ ...data, description: value });
        setError({ ...error, description: value ? "" : "Description is required" });
    }

    const handlePackage = (e) => {
        const value = e.target.value;
        setData({ ...data, packagePrice: value });
        setError({ ...error, packagePrice: value > 0 ? "" : "Package must be greater than zero" });
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
                const response = await axios.post('http://localhost:8080/api/cuisines/post', data);
                if (response.status === 200) {
                    alert("Cuisine added successfully!");
                    navigate('/allcuisines');
                }
            } catch (err) {
                console.error("Error adding cuisine:", err);
                alert("There was an error adding the cuisine. Please try again.");
            }
        }
    }

    const validate = (data) => {
        let isValid = true;
        let newErrors = {
            cuisineName: "",
            description: "",
            packagePrice: "",
            imageUrl: ""
        };
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

        if (!data.cuisineName) {
            isValid = false;
            newErrors.cuisineName = "Cuisine Name is required";
        }
        if (!data.description) {
            isValid = false;
            newErrors.description = "Description is required";
        }
        if (!data.packagePrice) {
            isValid = false;
            newErrors.packagePrice = "Package is required";
        } else if (data.packagePrice <= 0) {
            isValid = false;
            newErrors.packagePrice = "Package should be greater than zero";
        }
        if (!data.imageUrl) {
            isValid = false;
            newErrors.imageUrl = "URL is required";
        } else if (!urlPattern.test(data.imageUrl)) {
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
                    <h1>Add Cuisine</h1>
                </div>
            </div>
            <div className="eventform">
                <form type="submit" className="addeveform" onSubmit={handleSubmit}>
                    <h2>Add Cuisine</h2>
                    <div className="type">
                        <label htmlFor="cuisineName">Cuisine Name</label>
                        <input type="text" id="cuisineName" onChange={handleCuisineName}></input>
                        {error.cuisineName && <p className="error">{error.cuisineName}</p>}
                    </div>
                    <div className="desc">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" onChange={handleDesc}></textarea>
                        {error.description && <p className="error">{error.description}</p>}
                    </div>
                    <div className="package">
                        <label htmlFor="package">Package</label>
                        <input type="number" id="package" onChange={handlePackage}></input>
                        {error.packagePrice && <p className="error">{error.packagePrice}</p>}
                    </div>
                    <div className="image-url">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" id="imageUrl" onChange={handleImageUrl}></input>
                        {error.imageUrl && <p className="error">{error.imageUrl}</p>}
                    </div>
                    <Button type="submit">Add Cuisine</Button>
                </form>
            </div>
        </div>
    )
}

export default AddCuisine;
