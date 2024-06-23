import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NdeshjaSuperligesTable.css"; // Import the CSS file for styling

// Define paths for team logos
const teamLogos = {
  "FC-Ballkani": "http://localhost:5178/uploads/FC-Ballkani.png",
  "FC-Drita": "http://localhost:5178/uploads/FC-Drita.png",
  "FC-Llapi": "http://localhost:5178/uploads/FC-Llapi.png",
  "FC-Malisheva": "http://localhost:5178/uploads/FC-Malisheva.png",
  "FC-Feronikeli": "http://localhost:5178/uploads/FC-Feronikeli.png",
  "FC-Prishtina": "http://localhost:5178/uploads/FC-Prishtina.png",
  // Add more mappings as needed
};

const NdeshjaSuperligesTable = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const [filter, setFilter] = useState("future"); // Default to showing future matches

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5178/api/NdeshjaSuperliges");
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5178/api/Ekipa");
        const teamsData = response.data.reduce((acc, team) => {
          acc[team.id] = team.emriKlubit;
          return acc;
        }, {});
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchMatches();
    fetchTeams();
  }, []);

  const filteredMatches = matches.filter((match) =>
    filter === "past" ? match.statusiId === 1 : match.statusiId !== 1
  );

  const getTeamLogo = (teamId) => {
    const teamName = teams[teamId];
    const logoPath = teamLogos[teamName] || "default_logo_path.png";
    console.log(`Loading logo for team ID ${teamId} (${teamName}): ${logoPath}`);
    return logoPath;
  };

  return (
    <div>
      <h2 id="table-title">Ndeshjet e Superligës së Kosovës</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilter("past")} className={filter === "past" ? "active" : ""}>
          Ndeshjet e Zhvilluara
        </button>
        <button onClick={() => setFilter("future")} className={filter === "future" ? "active" : ""}>
          Ndeshjet e Ardhshme
        </button>
      </div>
      <div className="matches-list">
        {filteredMatches.map((match, index) => (
          <div key={index} className="match-card">
            <div className="team-logo">
              <img src={getTeamLogo(match.ekipa1)} alt={teams[match.ekipa1]} />
            </div>
            <div className="match-info">
              <div className="match-date">
                {new Date(match.dataENdeshjes).toLocaleDateString()} - {new Date(match.dataENdeshjes).toLocaleTimeString()}
              </div>
              <div className="teams">
                <span className="team">{teams[match.ekipa1] || "N/A"}</span>
                <span className="score">
                  {match.statusiId === 1 ? match.golaEkipa1 : '0'} : {match.statusiId === 1 ? match.golaEkipa2 : '0'}
                </span>
                <span className="team">{teams[match.ekipa2] || "N/A"}</span>
              </div>
              <div className="superliga-info">
                {match.superliga?.emri || "N/A"}
              </div>
            </div>
            <div className="team-logo">
              <img src={getTeamLogo(match.ekipa2)} alt={teams[match.ekipa2]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NdeshjaSuperligesTable;
