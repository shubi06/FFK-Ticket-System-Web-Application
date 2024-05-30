import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import "./Player.css";
import Header from "./Header"; // Duke supozuar që Header duhet të shfaqet këtu gjithashtu

const Player = () => {
  const [superligaPlayers, setSuperligaPlayers] = useState([]);
  const [kombetarjaPlayers, setKombetarjaPlayers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);

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

  useEffect(() => {
    setAllPlayers([...superligaPlayers, ...kombetarjaPlayers]);
  }, [superligaPlayers, kombetarjaPlayers]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredPlayers =
    selectedCategory === "Superliga"
      ? superligaPlayers
      : selectedCategory === "Kombetarja"
      ? kombetarjaPlayers
      : allPlayers;

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
              <option value="">Të gjithë lojtarët</option>
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
                  src={`http://localhost:5178${player.fotoPath}`} // Sigurohuni që rruga është e saktë
                  className="player-card-img-top"
                />
                <Card.Body className="player-card-body">
                  <Card.Title className="player-card-title">
                    {player.emri} {player.mbiemri}
                  </Card.Title>
                  <Card.Text className="player-card-text">
                    <strong>Pozicioni:</strong> {player.pozicioni}
                    <br />
                    <strong>Mosha:</strong> {player.mosha}
                    <br />
                    <strong>Gola:</strong> {player.gola}
                    <br />
                    <strong>Asiste:</strong> {player.asiste}
                    <br />
                    <strong>Nr. Faneles:</strong> {player.nrFaneles}
                    <br />
                    {player.superligaID && (
                      <>
                        <strong>Superliga ID:</strong> {player.superligaID}
                        <br />
                      </>
                    )}
                    {player.kombetarjaEmri && (
                      <>
                        <strong>Kombëtarja:</strong> {player.kombetarjaEmri}
                        <br />
                      </>
                    )}
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
