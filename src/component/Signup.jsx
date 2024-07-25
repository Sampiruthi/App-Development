import React, { useState } from 'react';
import '../assets/css/signup.css';
import { Button } from '@mui/material';
const Signup = () => {
    const [data, setdata] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: ""
    })
    const [message,setMessage]=useState();
    const [error,seterror]=useState();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate(data))
        {
            console.log(data);
            setMessage("Successful Signup!");
        }
        else
        {
            setMessage("");
        }
    }
    const handleUsername = (e) => {
        setdata({...data,username:e.target.value});
    }
    const handleEmail = (e) =>{
        setdata({...data,email:e.target.value});
    }
    const handlePassword = (e) => {
        setdata({...data,password:e.target.value});
    }
    const handleCpassword = (e) => {
        setdata({...data,cpassword:e.target.value});
    }
    const validate = (e) =>{
        let isValid=true;
        let errormsg="";
        if(!e.username)
        {
            isValid=false;
            errormsg="Username is required";
        }
        else if(!e.email)
        {
            isValid=false;
            errormsg="Email is required";
        }
        else if(!e.password)
        {
            isValid=false;
            errormsg="Password is required";
        }
        else if(!e.cpassword)
        {
            isValid=false;
            errormsg="Confirm Password is required";
        }
        else if(!/^[a-zA-Z0-9_]+$/.test(e.username))
        {
            isValid=false;
            errormsg="Username must contain only uppercase,lowercase letters,digits and underscores";
        }
        else if(!/\S+@\S+\.\S+/.test(e.email))
        {
            isValid=false;
            errormsg="Invalid email";
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
        else if(e.password!==e.cpassword)
        {
            isValid=false;
            errormsg="Password and Confirm Password do not match";
        }
        seterror(errormsg);
        return isValid;
    }
    return (
        <div className='Signup-page'>
            <div className='page-abc'>
                <div className='heading-signup'>
                    <b>Sign Up</b>
                </div>
                <form className="signup-form"onSubmit={handleSubmit}>
                    <div className='username'>
                        <div>
                            <label htmlFor='input-username'>Username</label>
                        </div>
                        <div>
                            <input type='text' id='input-username' onChange={handleUsername}></input>
                        </div>
                    </div>
                    <div className='signup-email'>
                        <div>
                            <label htmlFor='input-email'>Email</label>
                        </div>
                        <div>
                            <input type='email' id='input-email' onChange={handleEmail}></input>
                        </div>
                    </div>
                    <div className='signup-password'>
                        <div>
                            <label htmlFor='input-pwd'>Password</label>
                        </div>
                        <div>
                            <input type='password' id='input-pwd' onChange={handlePassword}></input>
                        </div>
                    </div>
                    <div className='signup-password'>
                        <div>
                            <label htmlFor='input-cpwd'>Confirm Password</label>
                        </div>
                        <div>
                            <input type='password' id='input-pwd' onChange={handleCpassword}></input>
                        </div>
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <div className='signup-button'>
                        <Button variant="contained" type="submit">Signup</Button>
                    </div>
                    <div>
                        <p>Already have an account?<a href="login">Login</a></p>
                    </div>
                    {message && <p className='signup-message'>{message}</p>}
                </form>
            </div>
        </div>
    )
}
export default Signup;