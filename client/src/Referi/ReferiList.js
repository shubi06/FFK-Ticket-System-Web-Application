import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReferiList() {
  const [referiList, setReferiList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferis();
  }, []);

  const fetchReferis = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Referi");
      setReferiList(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch referees", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this referee?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5178/api/Referi/${id}`);
        fetchReferis();  // Refresh the list after delete
      } catch (error) {
        console.log("Failed to delete referee", error);
      }
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Referee List</h1>
        <Link to="/portal/referi/create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="text-white-50" /> Add New Referee
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Referee DataTable</h6>
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Nationality</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {referiList.map((referi) => (
                    <tr key={referi.referi_ID}>
                      <td>{referi.referi_ID}</td>
                      <td>{referi.emri}</td>
                      <td>{referi.mbiemri}</td>
                      <td>{referi.kombesia}</td>
                      <td>{referi.mosha}</td>
                      <td>
                        <Link to={`/referi-view/${referi.referi_ID}`} className="btn btn-primary btn-sm mr-1">
                          View
                        </Link>
                        <Link to={`/portal/referi/edit/${referi.referi_ID}`} className="btn btn-info btn-sm mr-1">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(referi.referi_ID)} className="btn btn-danger btn-sm">
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

export default ReferiList;
