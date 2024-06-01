import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Services/AuthContext'; // Import AuthContext
import './stadium.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import { Modal, Button } from 'react-bootstrap'; // Import necessary Bootstrap components

const Stadium = () => {
  const [selectedSector, setSelectedSector] = useState('');
  const [sectorData, setSectorData] = useState(null);
  const { authData } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [showModal, setShowModal] = useState(false); // State for controlling the modal

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
    if (authData) {
      navigate(`/seats/${selectedSector}`);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ju lutem regjistrohuni ose kyquni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ju lutem regjistrohuni ose kyquni për të vazhduar.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Mbyll
          </Button>
          <Button variant="primary" onClick={() => navigate('/login', { state: { from: location } })}>
            Kyquni
          </Button>
          <Button variant="primary" onClick={() => navigate('/register', { state: { from: location } })}>
            Regjistrohuni
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Stadium;
