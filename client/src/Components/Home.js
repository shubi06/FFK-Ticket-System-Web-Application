import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Slider from './Slider';
import './Home.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Home = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:5178/api/Ndeshja');
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <Slider />
      <div className="content-container">
     
        <section className="matches-section">
          <h2>Upcoming Matches</h2>
          <div className="matches-content">
            {matches.length > 0 ? (
              matches.map((match) => (
                <div key={match.id} className="match-item">
                  <h3>{match.kombetarjaEmri} vs {match.ekipiKundershtar}</h3>
                  <p>Date: {new Date(match.data).toLocaleDateString()}</p>
                  <p>Time: {new Date(match.data).toLocaleTimeString()}</p>
                  <p>Location: {match.stadiumiEmri}</p>
               <Link to="/stadium">   <button  className="buy-ticket-button">Buy Ticket</button> </Link> 
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
            <div className="result-item">
              <h3>Team A 2-1 Team B</h3>
              <p>Date: May 10, 2024</p>
              <p>Location: Stadium 1</p>
            </div>
            <div className="result-item">
              <h3>Team C 3-0 Team D</h3>
              <p>Date: May 15, 2024</p>
              <p>Location: Stadium 2</p>
            </div>
            <div className="result-item">
              <h3>Team E 1-1 Team F</h3>
              <p>Date: May 20, 2024</p>
              <p>Location: Stadium 3</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
