import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function BiletatList() {

  const [biletatList, setBiletatList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // On Load
    getBiletat();
  }, []);

  let getBiletat = async () => {
    try {
      const biletat = await axios.get("http://localhost:5178/api/Bileta");
      setBiletatList(biletat.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">BILETAT</h1>
        <Link to="/portal/biletat-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faTicketAlt} className="creatinguser mr-2" />
          Krijo Bileta
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
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Cmimi</th>
                      <th>Ora Blerjes</th>
                      <th>Numri Uleses</th>
                      <th>Sektori</th>
                      <th>Ndeshja</th>
                      <th>ApplicationUserID</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {biletatList.map((bileta) => {
                      return (
                        <tr key={bileta.id}>
                          <td>{bileta.id}</td>
                          <td>{bileta.firstName}</td>
                          <td>{bileta.lastName}</td>
                          <td>{bileta.cmimi}</td>
                          <td>{new Date(bileta.oraBlerjes).toLocaleString()}</td>
                          <td>{bileta.numriUlses}</td>
                          <td>{bileta.sektoriUlses}</td>
                          <td><strong>Kosova vs {bileta.ekipiKundershtar}</strong></td>
                        
                         
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

export default BiletatList
