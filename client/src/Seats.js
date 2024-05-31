import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './Services/CartContext';
import './seats.css';

const Seats = () => {
  const { sectorId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

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

  const handleSeatClick = (seat) => {
    const seatWithSector = { ...seat, sectorId }; // Ensure sectorId is included
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
      removeFromCart(seat.id);
    } else if (selectedSeats.length < 4) {
      setSelectedSeats([...selectedSeats, seat.id]);
      addToCart(seatWithSector); // Pass seatWithSector to addToCart
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
              {seat.numri}
            </div>
          ))}
        </div>
      ))}
      <div className="selected-seats">
        <h2>Uleset e selektuara:</h2>
        {selectedSeats.map(id => {
          const seat = seats.find(s => s.id === id);
          return <span key={id} className="selected-seat">{seat.numri}</span>;
        })}
      </div>
      <div className="continue-button-wrapper">
        <button onClick={handleContinueClick} className="continue-button">Vazhdo tek Shporta</button>
      </div>
    </div>
  );
};

export default Seats;
