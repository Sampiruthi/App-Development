import { createContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [selectedEvent, setSelectedEvent] = useState(() => {
    const storedEvent = localStorage.getItem('selectedEvent');
    return storedEvent ? JSON.parse(storedEvent) : null;
  });

  const [selectedVenue, setSelectedVenue] = useState(() => {
    const storedVenue = localStorage.getItem('selectedVenue');
    return storedVenue ? JSON.parse(storedVenue) : null;
  });

  const [selectedCuisine, setSelectedCuisine] = useState(() => {
    const storedCuisine = localStorage.getItem('selectedCuisine');
    return storedCuisine ? JSON.parse(storedCuisine) : null;
  });

  useEffect(() => {
    localStorage.setItem('selectedEvent', JSON.stringify(selectedEvent));
    localStorage.setItem('selectedVenue', JSON.stringify(selectedVenue));
    localStorage.setItem('selectedCuisine', JSON.stringify(selectedCuisine));
  }, [selectedEvent, selectedVenue, selectedCuisine]);

  return (
    <BookingContext.Provider value={{ selectedEvent, setSelectedEvent, selectedVenue, setSelectedVenue, selectedCuisine, setSelectedCuisine }}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingProvider, BookingContext };
