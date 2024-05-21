import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Player.css';  
import Header from './Header'; // Assuming Header should be displayed here as well

const players = [
  {
    name: 'Player 1',
    position: 'Forward',
    imageUrl: 'images/Fadil.jpg'
  },
  {
    name: 'Player 2',
    position: 'Midfielder',
    imageUrl: 'images/image2.jpg'
  },
  {
    name: 'Player 3',
    position: 'Defender',
    imageUrl: 'images/image3.jpg'
  },
  {
    name: 'Player 4',
    position: 'Goalkeeper',
    imageUrl: 'images/image4.jpg'
  },
  {
    name: 'Player 5',
    position: 'Goalkeeper',
    imageUrl: 'images/image4.jpg'
  },
  {
    name: 'Player 6',
    position: 'Goalkeeper',
    imageUrl: 'images/image4.jpg'
  },
  {
    name: 'Player 7',
    position: 'Goalkeeper',
    imageUrl: 'images/image4.jpg'
  },
  // Add more players as needed
];

const Player = () => {
  return (
    <>
 
      <Container className="player-container">
        <h2>Players</h2>
        <Row>
          {players.map((player, index) => (
            <Col key={index} md={3}>
              <Card className="player-card">
                <Card.Img variant="top" src={player.imageUrl} className="player-card-img-top" />
                <Card.Body className="player-card-body">
                  <Card.Title className="player-card-title">{player.name}</Card.Title>
                  <Card.Text className="player-card-text">{player.position}</Card.Text>
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
