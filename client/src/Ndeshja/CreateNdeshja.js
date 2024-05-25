import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateNdeshja() {
  const [data, setData] = useState("");
  const [stadiumiId, setStadiumiId] = useState("");
  const [kompeticioniId, setKompeticioniId] = useState("");
  const [statusiId, setStatusiId] = useState("");
  const [kombetarjaId, setKombetarjaId] = useState("");
  const [ekipiKundershtar, setEkipiKundershtar] = useState("");
  const [golaEkipiJone, setGolaEkipiJone] = useState("");
  const [golaEkipiKundershtar, setGolaEkipiKundershtar] = useState("");
  const [statuset, setStatuset] = useState([]);
  const [kompeticionet, setKompeticionet] = useState([]);
  const [kombetaret, setKombetaret] = useState([]);
  const [stadiumet, setStadiumet] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusResponse, kompeticioniResponse, kombetarjaResponse, stadiumiResponse] = await Promise.all([
          axios.get("http://localhost:5178/api/Statusi"),
          axios.get("http://localhost:5178/api/Kompeticionet"),
          axios.get("http://localhost:5178/api/Kombetarja"),
          axios.get("http://localhost:5178/api/Stadiumi")
        ]);

        console.log("Status Response:", statusResponse.data);
        console.log("Kompeticioni Response:", kompeticioniResponse.data);
        console.log("Kombetarja Response:", kombetarjaResponse.data);
        console.log("Stadiumi Response:", stadiumiResponse.data);

        setStatuset(statusResponse.data);
        setKompeticionet(kompeticioniResponse.data);
        setKombetaret(kombetarjaResponse.data);
        setStadiumet(stadiumiResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatuset([]);
        setKompeticionet([]);
        setKombetaret([]);
        setStadiumet([]);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNdeshja = {
      data,
      stadiumiId: parseInt(stadiumiId),
      kompeticioniId: parseInt(kompeticioniId),
      statusiId: parseInt(statusiId),
      kombetarjaId: parseInt(kombetarjaId),
      ekipiKundershtar,
      golaEkipiJone: parseInt(golaEkipiJone),
      golaEkipiKundershtar: parseInt(golaEkipiKundershtar)
    };

    try {
      await axios.post("http://localhost:5178/api/Ndeshja", newNdeshja);
      navigate("/portal/ndeshja-list");
    } catch (error) {
      console.error("Error creating ndeshja:", error);
    }
  };

  return (
    <div className="container">
      <h2>Create Ndeshja</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Data:</label>
          <input
            type="datetime-local"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Stadiumi:</label>
          <select
            value={stadiumiId}
            onChange={(e) => setStadiumiId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Stadium</option>
            {stadiumet.length > 0 ? (
              stadiumet.map((stadium) => (
                <option key={stadium.id} value={stadium.id}>
                  {stadium.emri}
                </option>
              ))
            ) : (
              <option>No stadiums available</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Kompeticioni:</label>
          <select
            value={kompeticioniId}
            onChange={(e) => setKompeticioniId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Kompeticioni</option>
            {kompeticionet.length > 0 ? (
              kompeticionet.map((kompeticioni) => (
                <option key={kompeticioni.id} value={kompeticioni.id}>
                  {kompeticioni.emri}
                </option>
              ))
            ) : (
              <option>No competitions available</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Statusi:</label>
          <select
            value={statusiId}
            onChange={(e) => setStatusiId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Status</option>
            {statuset.length > 0 ? (
              statuset.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.emri}
                </option>
              ))
            ) : (
              <option>No statuses available</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Kombetarja:</label>
          <select
            value={kombetarjaId}
            onChange={(e) => setKombetarjaId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Kombetarja</option>
            {kombetaret.length > 0 ? (
              kombetaret.map((kombetarja) => (
                <option key={kombetarja.id} value={kombetarja.id}>
                  {kombetarja.emri}
                </option>
              ))
            ) : (
              <option>No national teams available</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Ekipi Kundershtar:</label>
          <input
            type="text"
            value={ekipiKundershtar}
            onChange={(e) => setEkipiKundershtar(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Gola Ekipi Jone:</label>
          <input
            type="number"
            value={golaEkipiJone}
            onChange={(e) => setGolaEkipiJone(e.target.value)}
            className="form-control"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Gola Ekipi Kundershtar:</label>
          <input
            type="number"
            value={golaEkipiKundershtar}
            onChange={(e) => setGolaEkipiKundershtar(e.target.value)}
            className="form-control"
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Ndeshja
        </button>
      </form>
    </div>
  );
}

export default CreateNdeshja;
