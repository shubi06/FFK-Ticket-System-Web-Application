import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Player.css';  
import Header from './Header'; // Assuming Header should be displayed here as well

const Player = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5178/api/Lojtaret'); // Adjust the URL as needed
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <>
     
      <Container className="player-container">
        <h2>Players</h2>
        <Row>
          {players.map((player, index) => (
            <Col key={index} md={3}>
              <Card className="player-card">
                <Card.Img variant="top" src={player.fotoPath} className="player-card-img-top" />
                <Card.Body className="player-card-body">
                  <Card.Title className="player-card-title">{player.emri} {player.mbiemri}</Card.Title>
                  <Card.Text className="player-card-text">{player.pozicioni}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Player;
