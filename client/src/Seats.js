import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './Services/CartContext';
import './seats.css';
import { useNavigationProgress } from './Services/NavigationProgressContext';

const Seats = () => {
  const { sectorId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { cart, addToCart, removeFromCart, getCart } = useContext(CartContext);
  const { isStepCompleted } = useNavigationProgress(); // Use the hook to get context value
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStepCompleted) {
      navigate(-1); // Navigate back if the step is not completed
    }
  }, [isStepCompleted, navigate]);
  
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:5178/api/Ulesja/sector/${sectorId}`);
        setSeats(response.data);
      } catch (error) {
        console.error("There was an error fetching the seats data!", error);
      }
    };

    fetchSeats();
  }, [sectorId]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (cart && cart.cartSeats) {
      const cartSeatIds = cart.cartSeats.map(seat => seat.ulesjaId);
      setSelectedSeats(cartSeatIds);
    }
  }, [cart]);

  const handleSeatClick = (seat) => {
    const seatWithSector = { ...seat, sectorId };
    const isSeatSelected = selectedSeats.includes(seat.id);
  
    if (isSeatSelected) {
      // If the seat is already selected, remove it from the selected seats
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
  
      // Find the seat in the cart using the cart seat's ulesjaId
      const cartSeat = cart.cartSeats.find(cartSeat => cartSeat.ulesjaId === seat.id);
      if (cartSeat) {
        removeFromCart(cartSeat.id); // Use the cart seat's ID to remove it
      } else {
        console.error('Seat not found in cart:', seat.id);
      }
    } else {
      // Check if selecting this seat exceeds the maximum allowed seats
      const totalSelectedSeats = selectedSeats.length + cart.cartSeats.filter(cs => !selectedSeats.includes(cs.ulesjaId)).length;
      if (totalSelectedSeats < 4) {
        // Add the seat to the selected seats
        setSelectedSeats([...selectedSeats, seat.id]);
        addToCart(seatWithSector);
      } else {
        alert('You cannot select more than 4 seats.');
      }
    }
  };

  const handleContinueClick = () => {
    navigate('/cart');
  };

  const getRows = (seats) => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 5) {
      rows.push(seats.slice(i, i + 5));
    }
    return rows;
  };

  const rows = getRows(seats);

 
  if (!isStepCompleted) {
    return null; // Don't render anything if the step is not completed
  }
  return (
    <div className="seats-wrapper">
      <h1>Seats in Sector {sectorId}</h1>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="seats-grid">
          {row.map(seat => (
            <div 
              key={seat.id} 
              className={`seat ${seat.isAvailable ? 'available' : 'unavailable'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              <span className="seat-number">{seat.numri}</span>
              <span className="seat-price">{seat.cmimi} EUR</span>
            </div>
          ))}
        </div>
      ))}
      <div className="selected-seats">
        <h2>Selected Seats:</h2>
        {selectedSeats.map(id => {
          const seat = seats.find(s => s.id === id);
          return seat ? <span key={id} className="selected-seat">{seat.numri} - {seat.cmimi} EUR</span> : null;
        })}
      </div>
      <div className="continue-button-wrapper">
        <button onClick={handleContinueClick} className="continue-button">Proceed to Cart</button>
      </div>
    </div>
  );
};

export default Seats;