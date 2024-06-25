import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SuperligaTable.css"; // Import the CSS file for styling

const SuperligaTable = () => {
  const [teams, setTeams] = useState([
    {
      Ekipi: "FC-Llapi",
      NdeshjeTeLuajtura: 0,
      Fitore: 0,
      Barazime: 0,
      Humbje: 0,
      GolaveTeShenuara: 0,
      GolaveTePesuara: 0,
      DiferencaGolave: 0,
      Piket: 0
    },
    {
      Ekipi: "FC-Feronikeli",
      NdeshjeTeLuajtura: 0,
      Fitore: 0,
      Barazime: 0,
      Humbje: 0,
      GolaveTeShenuara: 0,
      GolaveTePesuara: 0,
      DiferencaGolave: 0,
      Piket: 0
    }
  ]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("/api/superliga/tabela");
        setTeams(prevTeams => [...prevTeams, ...response.data]);
      } catch (error) {
        console.error("Gabim gjatë marrjes së të dhënave:", error);
      }
    };

    fetchTeams();
  }, []);

  const updatePoints = (teamName, isDraw = false, goals = 0) => {
    setTeams(prevTeams =>
      prevTeams.map(team => {
        if (isDraw) {
          if (team.Ekipi === teamName) {
            return { ...team, Piket: team.Piket + 1, Barazime: team.Barazime + 1 };
          }
        } else {
          if (team.Ekipi === teamName) {
            return { 
              ...team, 
              Piket: team.Piket + 3, 
              Fitore: team.Fitore + 1,
              GolaveTeShenuara: team.GolaveTeShenuara + goals,
              DiferencaGolave: team.DiferencaGolave + goals
            };
          }
        }
        return team;
      })
    );
  };

  const handleDraw = () => {
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    updatePoints(team1, true);
    updatePoints(team2, true);
  };

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
            <th>Shto Gol</th>
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
              <td>
                <button onClick={() => updatePoints(team.Ekipi, false, 1)}>Shto Gol</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3>Barazim</h3>
        <select id="team1">
          {teams.map((team, index) => (
            <option key={index} value={team.Ekipi}>{team.Ekipi}</option>
          ))}
        </select>
        <select id="team2">
          {teams.map((team, index) => (
            <option key={index} value={team.Ekipi}>{team.Ekipi}</option>
          ))}
        </select>
        <button onClick={handleDraw}>
          Barazim
        </button>
      </div>
    </div>
  );
};

export default SuperligaTable;
