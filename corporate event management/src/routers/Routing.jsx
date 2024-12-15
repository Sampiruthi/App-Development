import React from 'react';
import Login from '../component/Login';
import Signup from '../component/Signup';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../component/HomePage';
import About from '../component/About';
import Contact from '../component/Contact'
import Admin from '../component/Admin';
import Addevent from '../component/Addevent';
import AdminBooking from '../component/AdminBooking';
import UserBooking from '../component/UserBooking';
import Services from '../component/Services';
import Payment from '../component/Payment';
import Profile from '../component/Profile';
import AddVenue from '../component/AddVenue';
import AllVenues from '../component/AllVenues';
import Venue from '../component/Venue';
import AddCuisine from '../component/AddCuisine';
import AllCuisines from '../component/AllCuisines';
import Cuisines from '../component/Cuisines';
import MyBooking from '../component/MyBooking';
import Gallery from '../component/Gallery';
const Routing = () => {
    const user=JSON.parse(localStorage.getItem('user'));
    return(
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/user' element={user && user.role==='Organizer' ? <Navigate to='/home'/> : <Admin/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/addevent' element={<Addevent/>}/>
            <Route path='/addvenue' element={<AddVenue/>}/>
            <Route path='/addcuisine' element={<AddCuisine/>}/>
            <Route path='/allvenue' element={<AllVenues/>}/>
            <Route path='/allcuisines' element={<AllCuisines/>}/>
            <Route path='/user' element={<Admin/>}/>
            <Route path='/booking' element={<AdminBooking/>}/>
            <Route path='/userbooking' element={<UserBooking/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/venue' element={<Venue/>}/>
            <Route path='/cuisines' element={<Cuisines/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path="/my-profile" element={<Profile/>}/>
            <Route path="/my-bookings" element={<MyBooking/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
        </Routes>
    )
}
export default Routing;