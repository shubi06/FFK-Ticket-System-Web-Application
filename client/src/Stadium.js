import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './stadium.css';

const Stadium = () => {
  const [selectedSector, setSelectedSector] = useState('');
  const [sectorData, setSectorData] = useState(null);
  const navigate = useNavigate();

  const handleSectorClick = async (sectorId) => {
    try {
      const response = await axios.get(`http://localhost:5178/api/SektoriUlseve/${sectorId}`);
      setSectorData(response.data);
      setSelectedSector(sectorId);
    } catch (error) {
      console.error("There was an error fetching the sector data!", error);
    }
  };

  const handleContinueClick = () => {
    navigate(`/seats/${selectedSector}`);
  };

  return (
    <div className="wrapper">
      <div className='select-sectors'>
        <h1>Ju lutem zgjidheni sektorin</h1>
      </div>
      <div className="stadium">
        <div className="field">
          <div className="center-wrapper"></div>
          <div className="goalkeeper">
            <div></div>
            <div></div>
          </div>
          <div className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <div className="corners">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="goal">
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="ball"></div>
        <div className="sectors">
          <div className="sector north" onClick={() => handleSectorClick(5)}>
            {selectedSector === 5 && <div className="sector-label">Lindje</div>}
          </div>
          <div className="sector west" onClick={() => handleSectorClick(1)}>
            {selectedSector === 1 && <div className="sector-label">Veri</div>}
          </div>
          <div className="sector south" onClick={() => handleSectorClick(7)}>
            {selectedSector === 7 && <div className="sector-label">Perendim</div>}
          </div>
          <div className="sector east" onClick={() => handleSectorClick(6)}>
            {selectedSector === 6 && <div className="sector-label">Jug</div>}
          </div>
        </div>
      </div>
      {selectedSector && (
        <div className="continue-button-wrapper">
          <button onClick={handleContinueClick} className="continue-button">
            Vazhdo
          </button>
        </div>
      )}
    </div>
  );
};

export default Stadium;