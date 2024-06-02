import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EkipaList() {
  const [ekipaList, setEkipaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On component load, fetch Ekipa data
    fetchEkipas();
  }, []);

  const fetchEkipas = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Ekipa");
      setEkipaList(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch ekipa", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ekipa?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5178/api/Ekipa/${id}`);
        fetchEkipas();  // Refresh the list after delete
      } catch (error) {
        console.log("Failed to delete ekipa", error);
      }
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Ekipa List</h1>
        <Link to="/ekipa-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="text-white-50" /> Add New Ekipa
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Ekipa DataTable</h6>
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
                    <th>EmriKlubit</th>
                    <th>Trajneri</th>
                    <th>VitiThemelimit</th>
                    <th>NrTitujve</th>
                    <th>Aksionet</th>
                  </tr>
                </thead>
                <tbody>
                  {ekipaList.map((ekipa) => (
                    <tr key={ekipa.id}>
                      <td>{ekipa.id}</td>
                      <td>{ekipa.emriKlubit}</td>
                      <td>{ekipa.trajneri}</td>
                      <td>{ekipa.vitiThemelimit}</td>
                      <td>{ekipa.nrTitujve}</td>
                      <td>
                        <Link to={`/ekipa-view/${ekipa.id}`} className="btn btn-primary btn-sm mr-1">
                          View
                        </Link>
                        <Link to={`/ekipa-edit/${ekipa.id}`} className="btn btn-info btn-sm mr-1">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(ekipa.id)} className="btn btn-danger btn-sm">
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

export default EkipaList;
