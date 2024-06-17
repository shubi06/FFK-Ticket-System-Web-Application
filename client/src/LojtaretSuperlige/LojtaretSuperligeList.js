import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LojtaretSuperligeList() {
  const [lojtaretList, setLojtaretList] = useState([]);
  const [ekipaList, setEkipaList] = useState([]);
  const [selectedEkipa, setSelectedEkipa] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getLojtaretSuperlige();
    getEkipaList();
  }, []);

  const getLojtaretSuperlige = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5178/api/LojtaretSuperlige"
      );
      setLojtaretList(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getEkipaList = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Ekipa");
      setEkipaList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure do you want to delete the data?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/LojtaretSuperlige/${id}`);
        getLojtaretSuperlige();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEkipaChange = (event) => {
    setSelectedEkipa(event.target.value);
  };

  const filteredLojtaretList = selectedEkipa
    ? lojtaretList.filter(
        (lojtari) =>
          lojtari.ekipa && lojtari.ekipa.id === parseInt(selectedEkipa)
      )
    : lojtaretList;

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">LOJTARET SUPERLIGE</h1>
        <div>
          <select
            onChange={handleEkipaChange}
            value={selectedEkipa}
            className="form-control mb-2"
          >
            <option value="">Zgjidh ekipën</option>
            {ekipaList.map((ekipa) => (
              <option key={ekipa.id} value={ekipa.id}>
                {ekipa.emriKlubit}
              </option>
            ))}
          </select>
          <Link
            to="/portal/lojtaret-superlige-create"
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
            Krijo Lojtaret Superlige
          </Link>
        </div>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img
              src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif"
              alt="Loading"
            />
          ) : (
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Emri</th>
                    <th>Mbiemri</th>
                    <th>Mosha</th>
                    <th>Pozicioni</th>
                    <th>Gola</th>
                    <th>Asiste</th>
                    <th>Nr Faneles</th>
                    <th>Ekipa</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLojtaretList.map((lojtari) => (
                    <tr key={lojtari.id}>
                      <td>{lojtari.id}</td>
                      <td>{lojtari.emri}</td>
                      <td>{lojtari.mbiemri}</td>
                      <td>{lojtari.mosha}</td>
                      <td>{lojtari.pozicioni}</td>
                      <td>{lojtari.gola}</td>
                      <td>{lojtari.asiste}</td>
                      <td>{lojtari.nrFaneles}</td>
                      <td>
                        {lojtari.ekipa ? lojtari.ekipa.emriKlubit : "N/A"}
                      </td>
                      <td>
                        <Link
                          to={`/portal/lojtaret-superlige-view/${lojtari.id}`}
                          className="btn btn-primary btn-sm mr-1"
                        >
                          View
                        </Link>
                        <Link
                          to={`/portal/lojtaret-superlige-edit/${lojtari.id}`}
                          className="btn btn-info btn-sm mr-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(lojtari.id)}
                          className="btn btn-danger btn-sm mr-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LojtaretSuperligeList;
