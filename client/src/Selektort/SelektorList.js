import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Selektorlist() {
  const [selektorList, setSelektorList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getSelektors();
    console.log("welcome");
  }, []);

  let getSelektors = async () => {
    try {
      const selektors = await axios.get("http://localhost:5178/api/Selektori");
      setSelektorList(selektors.data);
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
        await axios.delete(`http://localhost:5178/api/Selektori/${id}`);
        getSelektors();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista e Selektorve</h1>
        <Link
          to="/portal/selektor-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Shto Selektorin
        </Link>
      </div>
      {/* <!-- DataTables --> */}
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
                    <th>Id</th>
                    <th>Emri</th>
                    <th>Mbiemri</th>
                    <th>Mosha</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Emri</th>
                    <th>Mbiemri</th>
                    <th>Mosha</th>
                    <th>Veprimet</th>
                  </tr>
                </tfoot>
                <tbody>
                  {selektorList.map((selektor) => {
                    return (
                      <tr key={selektor.id}>
                        <td>{selektor.id}</td>
                        <td>{selektor.emri}</td>
                        <td>{selektor.mbiemri}</td>
                        <td>{selektor.mosha}</td>
                        <td>
                          <Link
                            to={`/portal/selektor-view/${selektor.id}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            View
                          </Link>
                          <Link
                            to={`/portal/selektor-edit/${selektor.id}`}
                            className="btn btn-info btn-sm mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(selektor.id)}
                            className="btn btn-danger btn-sm mr-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Selektorlist;
