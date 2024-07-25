import React, { useState } from "react";
import '../assets/css/login.css';
import { Button } from "@mui/material";
const Login = () => {
    const [data, setData] = useState(
        {
            email: "",
            password: ""
        }
    );
    const [message, setMessage] = useState();
    const [error, setError] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(data)) {
            console.log(data);
            setMessage("Successful Login!");
        }
        else
        {
            setMessage("");
        }
    }
    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value });
    }
    const handlePass = (e) => {
        setData({ ...data, password: e.target.value });
    }
    const validate = (e) => {
        let isValid = true;
        let errormsg = "";
        const emailregex = /\S+@\S+\.\S+/;
        if (!e.email && !e.password) {
            isValid = false;
            errormsg = "Email & Password are required";
        }
        else if (!e.email && e.password) {
            isValid = false;
            errormsg = "Email is required";
        }
        else if (e.email && !e.password) {
            isValid = false;
            errormsg = "Password is required";
        }
        else if (!emailregex.test(e.email)) {
            isValid = false;
            errormsg = "Email is invalid";
        }
        else if (e.password.length < 8) {
            isValid = false;
            errormsg = "Password length must be atleast 8";
        }
        else if (!/[A-Z]/.test(e.password)) {
            isValid = false;
            errormsg = "Password must include atleast an uppercase letter";
        }
        else if (!/[0-9]/.test(e.password)) {
            isValid = false;
            errormsg = "Password must include atleast a number";
        }
        setError(errormsg);
        return isValid;
    }
    return (
        <div className="page">
            <div className="login">
                <div className="container">
                    <div className="abc">
                        <b>Login</b>
                    </div>
                    <form name="myForm" onSubmit={handleSubmit} className="Login-Form">
                        <div className="email">
                            <p>Email</p>
                            <input name="email" id="e" onChange={handleEmail}></input>
                        </div>
                        <div className="password">
                            <p>Password</p>
                            <input id="p" type="password" onChange={handlePass}></input>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="button">
                            <Button variant="contained" type="submit">Login</Button>
                        </div>
                        <div class="move">
                            <p>Don't have an account.<a href="signup">Register Now!</a></p>
                        </div>
                        <div className="message">
                            {message && <p>{message}</p>}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
export default Login;