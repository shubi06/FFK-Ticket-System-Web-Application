import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import "./Player.css";
import Header from "./Header"; // Duke supozuar që Header duhet të shfaqet këtu gjithashtu

const Player = () => {
  const [superligaPlayers, setSuperligaPlayers] = useState([]);
  const [kombetarjaPlayers, setKombetarjaPlayers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchSuperligaPlayers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5178/api/LojtaretSuperlige"
        ); // Endpoint për lojtarët e Superligës
        const data = await response.json();
        setSuperligaPlayers(data);
      } catch (error) {
        console.error("Error fetching Superliga players:", error);
      }
    };

    const fetchKombetarjaPlayers = async () => {
      try {
        const response = await fetch("http://localhost:5178/api/Lojtaret"); // Endpoint për lojtarët e Kombëtares
        const data = await response.json();
        const kombetarjaPlayers = data.filter(
          (player) => player.kombetarjaID !== null
        );
        setKombetarjaPlayers(kombetarjaPlayers);
      } catch (error) {
        console.error("Error fetching Kombetarja players:", error);
      }
    };

    fetchSuperligaPlayers();
    fetchKombetarjaPlayers();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredPlayers =
    selectedCategory === "Superliga"
      ? superligaPlayers
      : selectedCategory === "Kombetarja"
      ? kombetarjaPlayers
      : [];

  return (
    <>
      <Container className="player-container">
        <h2>Lojtarët</h2>
        <Form>
          <Form.Group controlId="categorySelect">
            <Form.Label>Zgjidh kategorinë</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Zgjidh kategorinë</option>
              <option value="Superliga">Superliga</option>
              <option value="Kombetarja">Kombëtarja</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <Row>
          {filteredPlayers.map((player, index) => (
            <Col key={index} md={3}>
              <Card className="player-card">
                <Card.Img
                  variant="top"
                  src={player.fotoPath}
                  className="player-card-img-top"
                />
                <Card.Body className="player-card-body">
                  <Card.Title className="player-card-title">
                    {player.emri} {player.mbiemri}
                  </Card.Title>
                  <Card.Text className="player-card-text">
                    {player.pozicioni}
                  </Card.Text>
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
