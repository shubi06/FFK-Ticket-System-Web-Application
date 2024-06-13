// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
import SoccerBall from './SoccerBall';

const Home = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5178/api/Ndeshja");
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Filter matches that are upcoming
  const upcomingMatches = matches.filter(match => match.statusiId === 1); // Assuming statusiId 1 is "Do të Zhvillohet"
  
  // Filter matches that have been played
  const playedMatches = matches.filter(match => match.statusiId === 2); // Assuming statusiId 2 is "Zhvilluar"

  return (
    <div>
      <div className="hero-section">
        <SoccerBall />
        <div className="hero-content">
          <h1>Federata e Futbollit të Kosovës</h1>
          <p>Prezantojmë me krenari ndeshjet e ardhshme të Kombëtares, ku talenti dhe përkushtimi i lojtarëve tanë do të shkëlqejë në fushë. Përgatituni të përjetoni emocione të pashlyeshme teksa kombëtarja jonë përballet me përfaqësueset më të forta, duke sjellë përpara gjithë pasionin dhe shpirtin garues që na karakterizon.</p>
        </div>
      </div>
      <div className="content-container">
        <section className="matches-section">
          <h2>Upcoming Matches</h2>
          <div className="matches-content">
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((match) => (
                <div key={match.id} className="match-item">
                  <h3>
                    {match.kombetarjaEmri} vs {match.ekipiKundershtar}
                  </h3>
                  <p>Date: {new Date(match.data).toLocaleDateString()}</p>
                  <p>Time: {new Date(match.data).toLocaleTimeString()}</p>
                  <p>Location: {match.stadiumiEmri}</p>
                  <Link to={`/stadium/${match.id}`}>
                    <button className="buy-ticket-button">Buy Ticket</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No upcoming matches available.</p>
            )}
          </div>
        </section>
        <section className="results-section">
          <h2>Recent Results</h2>
          <div className="results-content">
            {playedMatches.length > 0 ? (
              playedMatches.map((match) => (
                <div key={match.id} className="result-item">
                  <h3>{match.kombetarjaEmri} {match.golaEkipiJone} - {match.golaEkipiKundershtar} {match.ekipiKundershtar}</h3>
                  <p>Date: {new Date(match.data).toLocaleDateString()}</p>
                  <p>Location: {match.stadiumiEmri}</p>
                </div>
              ))
            ) : (
              <p>No recent results available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
