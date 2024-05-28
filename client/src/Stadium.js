import React, { useState, useEffect } from 'react';
import Seat from './Seat';
import './stadium.css';

const Stadium = () => {
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await fetch('http://localhost:5178/api/SektoriUlseve'); // Adjust the URL as needed
        const data = await response.json();
        setSectors(data);
      } catch (error) {
        console.error('Error fetching sectors:', error);
      }
    };

    fetchSectors();
  }, []);

  useEffect(() => {
    if (selectedSector) {
      setSeats(selectedSector.uleset);
      setSelectedSeats([]);
    }
  }, [selectedSector]);

  const handleSectorClick = (sectorId) => {
    const sector = sectors.find(s => s.id === sectorId);
    setSelectedSector(sector);
  };

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat.isAvailable && selectedSeats.length < 4) {
      setSelectedSeats([...selectedSeats, seatId]);
      setSeats(seats.map(seat => 
        seat.id === seatId ? { ...seat, isAvailable: false } : seat
      ));
    } else if (!seat.isAvailable) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      setSeats(seats.map(seat => 
        seat.id === seatId ? { ...seat, isAvailable: true } : seat
      ));
    }
  };

  const renderSeats = () => {
    const rows = [];
    let row = [];
    for (let i = 0; i < seats.length; i++) {
      row.push(
        <Seat
          key={seats[i].id}
          id={seats[i].id}
          status={seats[i].isAvailable ? 'available' : (selectedSeats.includes(seats[i].id) ? 'selected' : 'unavailable')}
          onClick={handleSeatClick}
        />
      );
      if ((i + 1) % 20 === 0) { // 20 seats per row
        rows.push(<div key={i / 20} className="row">{row}</div>);
        row = [];
      }
    }
    if (row.length > 0) {
      rows.push(<div key={Math.ceil(seats.length / 20)} className="row">{row}</div>);
    }
    return rows;
  };

  return (
    <div className="stadium">
      <h1>Stadium Seating</h1>
      <div className="sector-buttons">
        {sectors.map(sector => (
          <button key={sector.id} onClick={() => handleSectorClick(sector.id)}>
            {sector.emri}
          </button>
        ))}
      </div>
      {selectedSector && renderSeats()}
      {selectedSeats.length >= 4 && <div className="max-selection">You can select a maximum of 4 seats.</div>}
    </div>
  );
};

export default Stadium;
