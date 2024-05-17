import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function KombetarjaList() {

  const [kombetarjaList, setKombetarjaList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getKombetaret();
    console.log("welcome");
  }, []);

  let getKombetaret = async () => {
    try {
      const kombetaret = await axios.get("http://localhost:5178/api/Kombetarja");
      setKombetarjaList(kombetaret.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/Kombetarja/${id}`);
        getKombetaret();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">KOMBETARJA</h1>
        <Link to="/portal/kombetarja-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Krijo Kombetaren
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                    <th>ID</th>
                                     <th>Emri</th>
                               <th>Shteti</th>
                       <th>Actions</th>
                  
                    </tr>
                  </thead>
            
                  <tbody>
                    {kombetarjaList.map((kombetarja) => {
                      return (
                        <tr key={kombetarja.id}>
                                                                 <td>{kombetarja.id}</td>
                                                                 <td>{kombetarja.emri}</td>
                                                        <td>{kombetarja.shtetiID}</td>
                       
                          <th>
                            <Link to={`/portal/kombetarja-view/${kombetarja.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/kombetarja-edit/${kombetarja.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(kombetarja.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          }

        </div>
      </div>
    </>
  )
}

export default KombetarjaList