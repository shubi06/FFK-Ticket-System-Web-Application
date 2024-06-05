import { faSoccerBall } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RezultatList() {
  const [rezultatList, setRezultatList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On component load, fetch Rezultat data
    fetchRezultati();
  }, []);

  const fetchRezultati = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Rezultati");
      setRezultatList(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch rezultat", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this rezultat?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5178/api/Rezultati/${id}`);
        fetchRezultati();  // Refresh the list after delete
      } catch (error) {
        console.log("Failed to delete rezultat", error);
      }
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Rezultat List</h1>
        <Link to="/rezultat-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faSoccerBall} className="text-white-50" /> Add New Rezultat
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Rezultat DataTable</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <div className="text-center">
              <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" alt="Loading" />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Emri Klubit</th>
                    <th>Kundershtari</th>
                    <th>Data Ndeshjes</th>
                    <th>Rezultati</th>
                    <th>Aksionet</th>
                  </tr>
                </thead>
                <tbody>
                  {rezultatList.map((rezultat) => (
                    <tr key={rezultat.id}>
                      <td>{rezultat.id}</td>
                      <td>{rezultat.emriKlubit}</td>
                      <td>{rezultat.kundershtari}</td>
                      <td>{rezultat.dataNdeshjes}</td>
                      <td>{rezultat.rezultati}</td>
                      <td>
                        <Link to={`/rezultat-view/${rezultat.id}`} className="btn btn-primary btn-sm mr-1">
                          View
                        </Link>
                        <Link to={`/rezultat-edit/${rezultat.id}`} className="btn btn-info btn-sm mr-1">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(rezultat.id)} className="btn btn-danger btn-sm">
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

export default RezultatList;
