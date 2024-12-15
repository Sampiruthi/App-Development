import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [cardholderName, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!cardholderName) newErrors.cardholder = "Cardholder's name is required";
    if (!cardNumber.match(/^\d{4} \d{4} \d{4} \d{4}$/)) newErrors.cardNumber = 'Card number must be in format XXXX XXXX XXXX XXXX';
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Expiry date must be in format MM/YY';
    } else {
      const [month, year] = expiry.split('/').map(Number);
      if (month < 1 || month > 12) {
        newErrors.expiry = 'Invalid month';
      } else {
        const expiryDate = new Date(`20${year}`, month - 1);
        const currentDate = new Date();
        if (expiryDate <= currentDate) {
          newErrors.expiry = 'Card is expired';
        }
      }
    }
    if (!cvv.match(/^\d{3}$/)) newErrors.cvv = 'CVV must be 3 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      value = parts.join(' ');
    }
    setCardNumber(value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
        delete newErrors.cardNumber;
      }
      return newErrors;
    });
  };

  const handleChange = (setter, id) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (id === 'cardholder' && e.target.value) {
        delete newErrors.cardholder;
      }
      if (id === 'expiry' && e.target.value.match(/^\d{2}\/\d{2}$/)) {
        const [month, year] = e.target.value.split('/').map(Number);
        if (month >= 1 && month <= 12) {
          delete newErrors.expiry;
        }
      }
      if (id === 'cvv' && e.target.value.match(/^\d{3}$/)) {
        delete newErrors.cvv;
      }
      return newErrors;
    });
  };
  const bookingId = localStorage.getItem('bookingId');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const paymentData = {
          cardholderName,
          cardNumber,
          expiry,
          cvv,
          bookingId
        };
        const response = await axios.post('http://localhost:8080/api/payments/post', paymentData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        alert('Payment successful!');
        navigate('/home');
      } catch (error) {
        console.error('Error submitting payment:', error);
        alert('Payment failed, please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/userbooking');
  };

  return (
    <div className='main'>      
      <div className="payment-container">
        <h2 className="payment-title">Payments</h2>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="payment-input-group">
            <label htmlFor="cardholder">Cardholder's Name</label>
            <input
              id="cardholder"
              className="payment-input"
              value={cardholderName}
              onChange={handleChange(setCardholder, 'cardholder')}
              placeholder="Name On Card"
            />
            {errors.cardholder && <div className="payment-error">{errors.cardholder}</div>}
          </div>
          <div className="payment-input-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              className="payment-input"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="XXXX XXXX XXXX XXXX"
              pattern="\d{4} \d{4} \d{4} \d{4}"
            />
            {errors.cardNumber && <div className="payment-error">{errors.cardNumber}</div>}
          </div>
          <div className="payment-row">
            <div className="payment-column">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                id="expiry"
                className="payment-input-small"
                value={expiry}
                onChange={handleChange(setExpiry, 'expiry')}
                placeholder="MM/YY"
                pattern="\d{2}/\d{2}"
              />
              {errors.expiry && <div className="payment-error">{errors.expiry}</div>}
            </div>
            <div className="payment-column">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                className="payment-input-small"
                type='password'
                value={cvv}
                onChange={handleChange(setCvv, 'cvv')}
                placeholder="CVV"
              />
              {errors.cvv && <div className="payment-error">{errors.cvv}</div>}
            </div>
          </div>
          <div className="payment-buttons">
            <button className="cancel-button" type="button" onClick={handleCancel}>Cancel Payment</button>
            <button className="payment-button" type="submit">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
