// src/components/Tickets.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MatchesAndResults.css";

const MatchesAndResults = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all");

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

  // Filter out the matches that are "E Zhvilluar" (statusiId 2)
  const upcomingMatches = matches.filter((match) => match.statusiId === 1);

  const filteredMatches = upcomingMatches.filter((match) => {
    if (filter === "all") return true;
    return match.kompeticioniEmri === filter;
  });

  return (
    <div className="tickets-container">
      <h1>Blej Biletën</h1>
      <div className="filter-section">
        <label>Filtro sipas kompeticionit:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Të gjitha</option>
          {Array.from(new Set(upcomingMatches.map((match) => match.kompeticioniEmri))).map((competition) => (
            <option key={competition} value={competition}>
              {competition}
            </option>
          ))}
        </select>
      </div>
      <div className="matches-list">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div key={match.id} className="match-card">
              <h3>
                {match.kombetarjaEmri} vs {match.ekipiKundershtar}
              </h3>
              <p>Data: {new Date(match.data).toLocaleDateString()}</p>
              <p>Ora: {new Date(match.data).toLocaleTimeString()}</p>
              <p>Stadiumi: {match.stadiumiEmri}</p>
              <p>Kompeticioni: {match.kompeticioniEmri}</p>
              <Link to={`/stadium/${match.id}`}>
                <button className="buy-ticket-button">BLEJ BILETËN</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No upcoming matches available.</p>
        )}
      </div>
    </div>
  );
};

export default MatchesAndResults;
