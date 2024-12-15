import React from 'react';
import Routing from './routers/Routing';
import Admin from './component/Admin';
import Addevent from './component/Addevent';
import Payment from './component/Payment';
import HomePage from './component/HomePage';
import Services from './component/Services';
import AdminBooking from './component/AdminBooking';
import UserBooking from './component/UserBooking';
import { BookingProvider } from './context/BookingContext';
import About from './component/About';
import Contact from './component/Contact';
function App() {
  return (
    <BookingProvider>
      <div>
        <Routing />
        {/* <Admin/> */}
        {/* <Addevent/> */}
        {/* <AdminBooking/> */}
        {/* <Payment/> */}
        {/* <About/> */}
        {/* <Contact/> */}
        {/* <Services/> */}
        {/* <HomePage/> */}
        {/* <Bookings/> */}
        {/* <Profile/> */}
        {/* <UserBooking/> */}
      </div>
    </BookingProvider>
  );
}

export default App;