import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EkipaList() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5178/api/Ekipa");
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this team?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/Ekipa/${id}`);
        setTeams(teams.filter(team => team.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>EKIPA E SUPERLIGES</h1>
      {isLoading ? <p>Loading...</p> : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri Klubit</th>
              <th>Trajneri</th>
              <th>Viti Themelimit</th>
              <th>Nr Titujve</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.emriKlubit}</td>
                <td>{team.trajneri}</td>
                <td>{team.vitiThemelimit}</td>
                <td>{team.nrTitujve}</td>
                <td>
                  <Link to={`/portal/ekipa/view/${team.id}`} className="btn btn-primary btn-sm mr-1">View</Link>
                  <Link to={`/portal/ekipa/edit/${team.id}`} className="btn btn-info btn-sm mr-1">Edit</Link>
                  <button onClick={() => handleDelete(team.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/portal/ekipa/create" className="btn btn-primary">Add Ekipa</Link>
    </div>
  );
}

export default EkipaList;
