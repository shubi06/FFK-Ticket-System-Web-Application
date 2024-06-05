import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Services/AuthContext';
import './stadium.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigationProgress } from './Services/NavigationProgressContext';

const Stadium = () => {
  const [selectedSector, setSelectedSector] = useState('');
  const [sectorData, setSectorData] = useState(null);
  const [stadium, setStadium] = useState(null);
  const { authData } = useContext(AuthContext);
  const { setIsStepCompleted } = useNavigationProgress();
  const navigate = useNavigate();
  const { matchId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchStadiumByMatchId = async () => {
      try {
        const response = await axios.get(`http://localhost:5178/api/Stadiumi/Match/${matchId}`);
        setStadium(response.data);
      } catch (error) {
        console.error('Error fetching stadium details:', error);
      }
    };

    fetchStadiumByMatchId();
  }, [matchId]);

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
      setIsStepCompleted(true);
      navigate(`/seats/${selectedSector}/${matchId}`);
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
          <div className="sector north" onClick={() => handleSectorClick(5, 1)}>
            {selectedSector === 5 && <div className="sector-label">Lindje</div>}
          </div>
          <div className="sector west" onClick={() => handleSectorClick(1, 2)}>
            {selectedSector === 1 && <div className="sector-label">Veri</div>}
          </div>
          <div className="sector south" onClick={() => handleSectorClick(7, 3)}>
            {selectedSector === 7 && <div className="sector-label">Perendim</div>}
          </div>
          <div className="sector east" onClick={() => handleSectorClick(6, 4)}>
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
