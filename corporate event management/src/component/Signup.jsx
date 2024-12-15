import React, { useState } from 'react';
import '../assets/css/signup.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        role: "organizer"
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        uppercase: false,
        number: false
    });
    const [error, setError] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        general: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate(data)) {
            try {
                console.log("Submitting form with data:", data);
                await axios.post('http://localhost:8080/api/users/register', data);
                localStorage.setItem('user', JSON.stringify(data));
                setError({ username: "", email: "", password: "", cpassword: "", general: "" });
                alert("Signup Successful");
                navigate('/');
            } catch (error) {
                console.error("Signup error:", error); 
                setError((prevError) => ({ ...prevError, general: "User already exists" }));
            }
        }
    };

    const handleUsername = (e) => {
        setData({ ...data, username: e.target.value });
        validate({ ...data, username: e.target.value });
    };

    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value });
        validate({ ...data, email: e.target.value });
    };

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setData({ ...data, password: newPassword });
        setPasswordValidity({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /[0-9]/.test(newPassword)
        });
        validate({ ...data, password: newPassword });
    };

    const handleCpassword = (e) => {
        setData({ ...data, cpassword: e.target.value });
        validate({ ...data, cpassword: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };

    const validate = (data) => {
        let isValid = true;
        let newErrors = { username: "", email: "", password: "", cpassword: "", general: "" };
        const emailregex = /\S+@\S+\.\S+/;
        if (!data.username) {
            isValid = false;
            newErrors.username = "Username is required";
        } else if (data.username.length <= 2) {
            isValid = false;
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!data.email) {
            isValid = false;
            newErrors.email = "Email is required";
        } else if (!emailregex.test(data.email)) {
            isValid = false;
            newErrors.email = "Email is invalid";
        }

        if (!data.password) {
            isValid = false;
            newErrors.password = "Password is required";
        } else {
            if (data.password.length < 8) {
                isValid = false;
                newErrors.password = "Password length must be at least 8";
            } else if (!/[A-Z]/.test(data.password)) {
                isValid = false;
                newErrors.password = "Password must include at least one uppercase letter";
            } else if (!/[0-9]/.test(data.password)) {
                isValid = false;
                newErrors.password = "Password must include at least one number";
            }
        }

        if (!data.cpassword) {
            isValid = false;
            newErrors.cpassword = "Confirm Password is required";
        } else if (data.password !== data.cpassword) {
            isValid = false;
            newErrors.cpassword = "Password and Confirm Password do not match";
        }

        setError(newErrors);
        return isValid;
    };

    return (
        <div className='Signup-page'>
            <div className='page-abc'>
                <div className='heading-signup'>
                    <b>Sign Up</b>
                </div>
                <form className="Login-form" onSubmit={handleSubmit}>
                    <div className='lusername'>
                        <div>
                            <label htmlFor='u'>Username <b id="star">*</b></label>
                        </div>
                        <div>
                            <input type='text' id='u' onChange={handleUsername} />
                            {error.username && <p className='error'>{error.username}</p>}
                        </div>
                    </div>
                    <div className='email'>
                        <div>
                            <label htmlFor='e'>Email <b id="star">*</b></label>
                        </div>
                        <div>
                            <input type='email' id='e' onChange={handleEmail} />
                            {error.email && <p className='error'>{error.email}</p>}
                        </div>
                    </div>
                    <div className='password'>
                        <div>
                            <label htmlFor='p'>Password <b id="star">*</b></label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id='p' 
                                onChange={handlePassword} 
                                style={{ paddingRight: '30px' }}
                            />
                            <span 
                                onClick={togglePasswordVisibility} 
                                style={{ 
                                    position: 'absolute', 
                                    right: '10px', 
                                    top: '30%',  
                                    cursor: 'pointer' 
                                }}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                            {error.password && <p className='error'>{error.password}</p>}
                        </div>
                    </div>
                    <div className='password'>
                        <div>
                            <label htmlFor='p'>Confirm Password <b id="star">*</b></label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type={showCPassword ? 'text' : 'password'} 
                                id='p' 
                                onChange={handleCpassword} 
                                style={{ paddingRight: '30px' }}
                            />
                            <span 
                                onClick={toggleCPasswordVisibility} 
                                style={{ 
                                    position: 'absolute', 
                                    right: '10px', 
                                    top: '30%', 
                                    cursor: 'pointer' 
                                }}
                            >
                                <FontAwesomeIcon icon={showCPassword ? faEyeSlash : faEye} />
                            </span>
                            {error.cpassword && <p className='error'>{error.cpassword}</p>}
                        </div>
                    </div>
                    {error.general && <p className='error'>{error.general}</p>}
                    <div className='signup-button'>
                        <Button variant="contained" type="submit">Signup</Button>
                    </div>
                    <div>
                        <p>Already have an account? <a href="/">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;