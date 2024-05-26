import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StadiumiList() {
  const [stadiumiList, setStadiumiList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getStadiumi();
    console.log("welcome");
  }, []);

  let getStadiumi = async () => {
    try {
      const stadiumi = await axios.get("http://localhost:5178/api/Stadiumi");
      setStadiumiList(stadiumi.data);
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
        await axios.delete(`http://localhost:5178/api/Stadiumi/${id}`);
        getStadiumi();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista e Stadiumit</h1>
        <Link
          to="/portal/stadiumi-create"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Shto Stadiumin
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
                    <th>Kapaciteti</th>
                    <th>Viti Ndertimit</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
              
                <tbody>
                  {stadiumiList.map((stadiumi) => {
                    return (
                      <tr key={stadiumi.id}>
                        <td>{stadiumi.id}</td>
                        <td>{stadiumi.emri}</td>
                        <td>{stadiumi.kapaciteti}</td>  
                        <td>{stadiumi.vitiNdertuar}</td>
                    
                        <td>
                          <Link
                            to={`/portal/stadiumi-view/${stadiumi.id}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            View
                          </Link>
                          <Link
                            to={`/portal/stadiumi-edit/${stadiumi.id}`}
                            className="btn btn-info btn-sm mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(stadiumi.id)}
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
export default StadiumiList;
