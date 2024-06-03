// src/components/KontabilitetiView.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function KontabilitetiView() {
  const { id } = useParams();
  const [kontabiliteti, setKontabiliteti] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKontabiliteti = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5178/api/Kontabiliteti/${id}`
        );
        setKontabiliteti(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kontabiliteti details", error);
      }
    };
    fetchKontabiliteti();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!kontabiliteti) return <p>No kontabiliteti found</p>;

  return (
    <div className="container">
      <h3>Kontabiliteti Details</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {kontabiliteti.stafi.emri} {kontabiliteti.stafi.mbiemri}
          </h5>
          <p className="card-text">ID: {kontabiliteti.id}</p>
          <p className="card-text">
            Stafi: {kontabiliteti.stafi.emri} {kontabiliteti.stafi.mbiemri}
          </p>
          <p className="card-text">
            Shpenzimet: {kontabiliteti.shpenzimet.pershkrimi}
          </p>
          <p className="card-text">
            Data: {new Date(kontabiliteti.data).toLocaleDateString()}
          </p>
          <p className="card-text">Shuma Totale: {kontabiliteti.shumaTotale}</p>
        </div>
      </div>
    </div>
  );
}

export default KontabilitetiView;
