// src/components/KontabilitetiList.js
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function KontabilitetiList() {
  const [kontabilitetiList, setKontabilitetiList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getKontabiliteti();
  }, []);

  let getKontabiliteti = async () => {
    try {
      const kontabiliteti = await axios.get(
        "http://localhost:5178/api/Kontabiliteti"
      );
      setKontabilitetiList(kontabiliteti.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure do you want to delete the data?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/Kontabiliteti/${id}`);
        getKontabiliteti();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Llogarit shumën totale të shumave totale të të gjitha rreshtave
  let totalShumaTotale = 0;
  kontabilitetiList.forEach((kontabiliteti) => {
    totalShumaTotale += kontabiliteti.shumaTotale;
  });

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">KONTABILITETI</h1>
        <Link
          to="/portal/kontabiliteti-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Krijo Kontabiliteti
        </Link>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src="https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif" />
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
                    <th>Stafi</th>
                    <th>Shpenzimet</th>
                    <th>Data</th>
                    <th>Shuma Totale</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kontabilitetiList.map((kontabiliteti) => {
                    return (
                      <tr key={kontabiliteti.id}>
                        <td>{kontabiliteti.id}</td>
                        <td>
                          {kontabiliteti.stafi.emri}{" "}
                          {kontabiliteti.stafi.mbiemri}
                        </td>
                        <td>{kontabiliteti.shpenzimet.pershkrimi}</td>
                        <td>
                          {new Date(kontabiliteti.data).toLocaleDateString()}
                        </td>
                        <td>{kontabiliteti.shumaTotale}</td>
                        <td>
                          <Link
                            to={`/portal/kontabiliteti-view/${kontabiliteti.id}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            View
                          </Link>
                          <Link
                            to={`/portal/kontabiliteti-edit/${kontabiliteti.id}`}
                            className="btn btn-info btn-sm mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(kontabiliteti.id)}
                            className="btn btn-danger btn-sm mr-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Shto rreshtin për shumën totale */}
                <tfoot>
                  <tr>
                    <td colSpan="4">Totali i Shpenzimeve</td>
                    <td>{totalShumaTotale}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default KontabilitetiList;
