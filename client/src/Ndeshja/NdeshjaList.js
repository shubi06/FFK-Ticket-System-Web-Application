import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NdeshjaList() {
  const [ndeshjaList, setNdeshjaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getNdeshjet();
    console.log("Component mounted");
  }, []);

  let getNdeshjet = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Ndeshja");
      console.log("Data fetched from API:", response.data);
      if (response.data && response.data.length !== undefined) {
        setNdeshjaList(response.data);
      } else if (response.data && response.data.$values) {
        setNdeshjaList(response.data.$values);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/Ndeshja/${id}`);
        getNdeshjet();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lista e Ndeshjeve</h1>
        <Link
          to="/portal/create-ndeshja"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          Shto Ndeshje
        </Link>
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
                    <th>Id</th>
                    <th>Data</th>
                    <th>Stadiumi</th>
                    <th>Kompeticioni</th>
                    <th>Statusi</th>
                    <th>Kombetarja</th>
                    <th>Ekipi Kundershtar</th>
                    <th>Gola Ekipi Jone</th>
                    <th>Gola Ekipi Kundershtar</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(ndeshjaList) && ndeshjaList.map((ndeshja) => {
                    const golaEkipiJone = (ndeshja.statusiId === 1 || ndeshja.statusiId === 3) ? "---" : ndeshja.golaEkipiJone;
                    const golaEkipiKundershtar = (ndeshja.statusiId === 1) ? "---" : ndeshja.golaEkipiKundershtar;

                    return (
                      <tr key={ndeshja.id}>
                        <td>{ndeshja.id}</td>
                        <td>{ndeshja.data}</td>
                        <td>{ndeshja.stadiumiEmri}</td>
                        <td>{ndeshja.kompeticioniEmri}</td>
                        <td>{ndeshja.statusiEmri}</td>
                        <td>{ndeshja.kombetarjaEmri}</td>
                        <td>{ndeshja.ekipiKundershtar}</td>
                        <td>{golaEkipiJone}</td>
                        <td>{golaEkipiKundershtar}</td>
                        <td>
                        <Link
                            to={`/portal/ndeshja-view/${ndeshja.id}`}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            View
                          </Link>
                          <Link
                            to={`/portal/edit-ndeshja/${ndeshja.id}`}
                            className="btn btn-info btn-sm mr-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(ndeshja.id)}
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

export default NdeshjaList;

