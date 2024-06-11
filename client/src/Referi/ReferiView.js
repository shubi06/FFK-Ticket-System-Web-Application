import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ReferiView() {
  const { id } = useParams(); // Get the id from the URL parameters
  const [referi, setReferi] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferi = async () => {
      try {
        const response = await axios.get(`http://localhost:5178/api/Referi/${id}`);
        setReferi(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch referee", error);
      }
    };

    fetchReferi();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center">
        <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
      </div>
    );
  }

  if (!referi) {
    return <div>Referee not found</div>;
  }

  return (
    <div className="container">
      <h3>View Referee - ID: {referi.referi_ID}</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name: {referi.emri} {referi.mbiemri}</h5>
          <p className="card-text">Nationality: {referi.kombesia}</p>
          <p className="card-text">Age: {referi.mosha}</p>
          <Link to="/portal/referi-list" className="btn btn-primary">Back to List</Link>
        </div>
      </div>
    </div>
  );
}

export default ReferiView;
