import React from 'react';
import './stadium.css';

const Seat = ({ id, status, onClick }) => {
  const handleClick = () => {
    if (status === 'available' || status === 'selected') {
      onClick(id);
    }
  };

  return (
    <div className={`seat ${status}`} onClick={handleClick}>
      {id}
    </div>
  );
};

export default Seat;
