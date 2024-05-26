// src/Stadium.js
import React, { useState } from 'react';
import './stadium.css';

const Seat = ({ id, status, onClick }) => {
  const handleClick = () => {
    if (status === 'available') {
      onClick(id);
    }
  };

  return (
    <div
      className={`seat ${status}`}
      onClick={handleClick}
    >
      {id}
    </div>
  );
};

const Stadium = () => {
  const [seats, setSeats] = useState(Array.from({ length: 150 }, (_, index) => ({ id: index + 1, status: 'available' })));

  const handleSeatClick = (seatId) => {
    setSeats(seats.map(seat => {
      if (seat.id === seatId) {
        return { ...seat, status: seat.status === 'available' ? 'selected' : 'available' };
      }
      return seat;
    }));
  };

  const renderSeats = () => {
    const rows = [];
    let row = [];
    for (let i = 0; i < seats.length; i++) {
      row.push(
        <Seat
          key={seats[i].id}
          id={seats[i].id}
          status={seats[i].status}
          onClick={handleSeatClick}
        />
      );
      if ((i + 1) % 40 === 0) {
        rows.push(<div key={i / 40} className="row">{row}</div>);
        row = [];
      }
    }
    return rows;
  };

  return (
    <div className="stadium">
      {renderSeats()}
    </div>
  );
};

export default Stadium;
