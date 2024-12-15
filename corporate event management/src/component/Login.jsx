import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../assets/css/login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        role: ""
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState({
        length: false,
        uppercase: false,
        number: false
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        role: "",
        general: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate(data)) {
            try {
                const response = await axios.get('http://localhost:8080/api/users/login', {
                    params: {
                        email: data.email,
                        password: data.password,
                        role: data.role
                    }
                });
                if (response.status === 200) {
                    const { token, user } = response.data;
                    if (user && data.email === user.email && data.role === user.role) {
                        alert("Login Successful");
                        setErrors({ email: "", password: "", role: "", general: "" });
                        localStorage.setItem('token', token); 
                        localStorage.setItem('userId', user.id); 
                        localStorage.setItem('user', JSON.stringify(user));
                        localStorage.setItem('token', token);
                        if (user.role === 'admin') {
                            navigate('/user');
                        } else {
                            navigate('/home');
                        }
                    } else {
                        setErrors({ ...errors, general: "Invalid credentials" });
                    }
                } else {
                    setErrors({ ...errors, general: "Invalid credentials" });
                }
            } catch (err) {
                console.error('Error:', err.message);
                setErrors({ ...errors, general: "Invalid credentials" });
            }
        }
    };
    
    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value });
        validate({ ...data, email: e.target.value });
    };

    const handlePass = (e) => {
        const newPassword = e.target.value;
        setData({ ...data, password: newPassword });
        setPasswordValidity({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /[0-9]/.test(newPassword)
        });
        validate({ ...data, password: newPassword });
    };

    const handleRole = (e) => {
        setData({ ...data, role: e.target.value });
        validate({ ...data, role: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = (data) => {
        let isValid = true;
        let newErrors = { email: "", password: "", role: "", username: "", general: "" };
        const emailregex = /\S+@\S+\.\S+/;

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

        if (!data.role) {
            isValid = false;
            newErrors.role = "Role is required";
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="page">
            <div className="login">
                <div className="container">
                    <div className="abc">
                        <b>Login</b>
                    </div>
                    <form name="myForm" onSubmit={handleSubmit} className="Login-Form">
                        <div className="email">
                            <p>Email <b id="star">*</b></p>
                            <input name="email" id="e" onChange={handleEmail}></input>
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>
                        <div className="password">
                            <p>Password <b id="star">*</b></p>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='p'
                                    onChange={handlePass}
                                    style={{ paddingRight: '30px' }}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>
                        <div className="role">
                            <p>Role <b id="star">*</b></p>
                            <select id="role" onChange={handleRole}>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="organizer">Organizer</option>
                            </select>
                            {errors.role && <p className="error">{errors.role}</p>}
                        </div>
                        {errors.general && <p className="error">{errors.general}</p>}
                        <div className="button">
                            <Button variant="contained" type="submit">Login</Button>
                        </div>
                        <div className="move">
                            <p>Don't have an account? <a href="/signup">Register Now!</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;