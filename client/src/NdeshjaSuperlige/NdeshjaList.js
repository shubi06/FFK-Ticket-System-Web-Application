import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NdeshjaList() {
  const [ndeshjaList, setNdeshjaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchNdeshjet();
  }, []);

  const fetchNdeshjet = async () => {
    try {
      const response = await axios.get('http://localhost:5178/api/NdeshjaSuperliges');
      console.log('Fetched matches:', response.data); // Add this line
      if (Array.isArray(response.data)) {
        setNdeshjaList(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
      setLoading(false);
    } catch (error) {
      console.log('Failed to fetch matches', error);
      setLoading(false); // Ensure loading stops in case of error
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this match?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5178/api/NdeshjaSuperliges/${id}`);
        fetchNdeshjet(); // Refresh the list after delete
      } catch (error) {
        console.log('Failed to delete match', error);
      }
    }
  };

  return (
    <>
      {console.log('Current ndeshjaList:', ndeshjaList)}  {/* Add this line */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Ndeshja Superlige</h1>
        <Link to="/portal/create-ndeshja-superlige" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="text-white-50" /> Krijo Ndeshja Superlige
        </Link>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTable</h6>
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
                    <th>Ekipa 1</th>
                    <th>Ekipa 2</th>
                    <th>Data E Ndeshjes</th>
                    <th>Statusi ID</th>
                    <th>Superliga ID</th>
                    <th>Ekipa ID</th>
                    <th>Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(ndeshjaList) && ndeshjaList.map((ndeshja) => (
                    <tr key={ndeshja.id}>
                      <td>{ndeshja.id}</td>
                      <td>{ndeshja.ekipa1}</td>
                      <td>{ndeshja.ekipa2}</td>
                      <td>{ndeshja.dataENdeshjes}</td>
                      <td>{ndeshja.statusiId}</td>
                      <td>{ndeshja.superligaId}</td>
                      <td>{ndeshja.ekipaId}</td>
                      <td>
                        <Link to={`/portal/view-ndeshja-superlige/${ndeshja.id}`} className="btn btn-primary btn-sm mr-1">
                          View
                        </Link>
                        <Link to={`/portal/edit-ndeshja-superlige/${ndeshja.id}`} className="btn btn-info btn-sm mr-1">
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(ndeshja.id)} className="btn btn-danger btn-sm">
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

export default NdeshjaList;
