import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './Services/CartContext';
import './seats.css';
import { useNavigationProgress } from './Services/NavigationProgressContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Seats = () => {
  const { sectorId, ndeshjaId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [unavailableSeat, setUnavailableSeat] = useState(null); // Shto gjendjen për të mbajtur informacionin për ulsën e padisponueshme
  const { cart, addToCart, removeFromCart, getCart } = useContext(CartContext);
  const { isStepCompleted } = useNavigationProgress();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStepCompleted) {
      navigate('/');
      return;
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
    if (!seat.isAvailable) {
      setUnavailableSeat(seat); // Vendos ulsën e padisponueshme
      return; // Mos lejo zgjedhjen e ulsës së padisponueshme
    }

    const seatWithSector = { ...seat, sectorId, ndeshjaId };
    const isSeatSelected = selectedSeats.includes(seat.id);

    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));

      const cartSeat = cart.cartSeats.find(cartSeat => cartSeat.ulesjaId === seat.id);
      if (cartSeat) {
        removeFromCart(cartSeat.id);
      } else {
        console.error('Seat not found in cart:', seat.id);
      }
    } else {
      const totalSelectedSeats = selectedSeats.length + cart.cartSeats.filter(cs => !selectedSeats.includes(cs.ulesjaId)).length;
      if (totalSelectedSeats < 4) {
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

    
      <Modal
        show={!!unavailableSeat} 
        onHide={() => setUnavailableSeat(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Unavailable Seat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The selected seat is not available. Please choose another seat.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUnavailableSeat(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Seats;
