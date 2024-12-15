import React, { useState, useEffect } from 'react';
import '../assets/css/profile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import elite from '../assets/css/images/logo.png';
const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    aboutMe: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    console.log('Retrieved from localStorage:', storedUserData);
    if (storedUserData) {
        setUserData(storedUserData);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="pheader">
        <div className='pnavbar-sub'>
          {/* <img id="image-57-6" alt="logo" src="https://eliteevents.in/wp-content/uploads/2023/12/logo3.png" className="ct-image" /> */}
          <img id="imageelite" alt="logo" src={elite} class="ct-image" style={{marginTop:"20px",marginRight:"70px"}}/>
          <a href="/home">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Our Services</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Contact Us</a>
          <div className="profile-dropdown-profile">
            <AccountCircleIcon sx={{
              fontSize: 40,
              color: 'white'
            }} />
            <div className="profile-dropdown-content">
              <a href="/my-profile">My Profile</a>
              <a href="/my-bookings">My Bookings</a>
              <a href="/">Logout</a>
            </div>
          </div>
        </div>
        <div className="pcommon">
          <h1>My Profile</h1>
        </div>
      </div>
      <div className="profile-container">
        <div className="profile-info">
          <div className="profile-field">
            <label>Username:</label>
            <input type="text" name="username" value={userData.username} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} disabled={!isEditing} />
          </div>
          <div className="about-me-section">
            <label>About Me:</label>
            {isEditing ? (
              <textarea
                name="aboutMe"
                value={userData.aboutMe || ''}
                onChange={handleChange}
              />
            ) : (
              <span>{userData.aboutMe || 'N/A'}</span>
            )}
          </div>
          <button onClick={isEditing ? handleSaveClick : handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;