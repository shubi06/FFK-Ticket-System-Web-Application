import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SuperligaTable.css"; // Import the CSS file for styling

const SuperligaTable = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/superliga/tabela");
        setTeams(response.data);
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h2 id="table-title">Tabela e Superligës së Kosovës</h2>
      <table id="superliga-table">
        <thead>
          <tr>
            <th>Pozicioni</th>
            <th>Ekipi</th>
            <th>Ndeshje të luajtura</th>
            <th>Fitore</th>
            <th>Barazime</th>
            <th>Humbje</th>
            <th>Gola të shënuara</th>
            <th>Gola të pësuara</th>
            <th>Diferenca e golave</th>
            <th>Pikët</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index} id={`team-row-${index}`}>
              <td className="position">{index + 1}</td>
              <td className="team-name">{team.Ekipi}</td>
              <td className="matches-played">{team.NdeshjeTeLuajtura}</td>
              <td className="wins">{team.Fitore}</td>
              <td className="draws">{team.Barazime}</td>
              <td className="losses">{team.Humbje}</td>
              <td className="goals-scored">{team.GolaveTeShenuara}</td>
              <td className="goals-conceded">{team.GolaveTePesuara}</td>
              <td className="goal-difference">{team.DiferencaGolave}</td>
              <td className="points">{team.Piket}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperligaTable;
