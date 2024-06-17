import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LojtaretSuperligeView() {
  const { id } = useParams();
  const [lojtaretSuperlige, setLojtaretSuperlige] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLojtaretSuperlige = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5178/api/LojtaretSuperlige/${id}`
        );
        setLojtaretSuperlige(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lojtaret superlige details", error);
      }
    };
    fetchLojtaretSuperlige();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (!lojtaretSuperlige) return <p>No lojtaret superlige found</p>;

  return (
    <div className="container">
      <h3>Lojtari Superlige Details</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {lojtaretSuperlige.emri} {lojtaretSuperlige.mbiemri}
          </h5>
          <p className="card-text">ID: {lojtaretSuperlige.id}</p>
          <p className="card-text">Emri: {lojtaretSuperlige.emri}</p>
          <p className="card-text">Mbiemri: {lojtaretSuperlige.mbiemri}</p>
          <p className="card-text">Mosha: {lojtaretSuperlige.mosha}</p>
          <p className="card-text">Pozicioni: {lojtaretSuperlige.pozicioni}</p>
          <p className="card-text">Gola: {lojtaretSuperlige.gola}</p>
          <p className="card-text">Asiste: {lojtaretSuperlige.asiste}</p>
          <p className="card-text">NrFaneles: {lojtaretSuperlige.nrFaneles}</p>
          {lojtaretSuperlige.ekipa && (
            <p className="card-text">
              Ekipi: {lojtaretSuperlige.ekipa.emriKlubit}
            </p>
          )}
          {lojtaretSuperlige.fotoPath && (
            <div className="card-img">
              <p className="card-text">Foto:</p>
              <img
                src={`http://localhost:5178${lojtaretSuperlige.fotoPath}`}
                alt={`${lojtaretSuperlige.emri} ${lojtaretSuperlige.mbiemri}`}
                className="img-fluid"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LojtaretSuperligeView;
