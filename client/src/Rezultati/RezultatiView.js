import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RezultatiView() {
  const { id } = useParams(); // Get the id from the URL parameters
  const [rezultati, setRezultati] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRezultati = async () => {
      try {
        const response = await axios.get(`http://localhost:5178/api/Rezultati/${id}`);
        setRezultati(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch rezultat", error);
      }
    };

    fetchRezultati();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center">
        <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
      </div>
    );
  }

  if (!rezultati) {
    return <div>Rezultati not found</div>;
  }

  return (
    <div className="container">
      <h3>View Rezultati - ID: {rezultati.id}</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Club: {rezultati.emriKlubit}</h5>
          <p className="card-text">Opponent: {rezultati.kundershtari}</p>
          <p className="card-text">Match Date: {new Date(rezultati.dataNdeshjes).toLocaleDateString()}</p>
          <p className="card-text">Result: {rezultati.golatEkipi1} - {rezultati.golatEkipi2}</p>
          <Link to="/portal/rezultati-list" className="btn btn-primary">Back to List</Link>
        </div>
      </div>
    </div>
  );
}

export default RezultatiView;
