import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ShtetiList() {

  const [shtetiList, setShtetiList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //On Load
    getShtetet();
    console.log("welcome");
  }, []);

  let getShtetet = async () => {
    try {
      const shtetet = await axios.get("http://localhost:5178/api/Shteti");
      setShtetiList(shtetet.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/Shteti/${id}`);
        getShtetet();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">SHTETI</h1>
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
              
                  
                    </tr>
                  </thead>
            
                  <tbody>
                    {shtetiList.map((shteti) => {
                      return (
                        <tr key={shteti.id}>
                          <td>{shteti.id}</td>
                          <td>{shteti.emri}</td>
                    
                       
                       
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

export default ShtetiList