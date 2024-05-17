import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ListUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/Users");
      const userData = response.data;
      if (Array.isArray(userData)) {
        // Ensure each user's roles is an array
        const processedUserData = userData.map(user => ({
          ...user,
          roles: Array.isArray(user.roles) ? user.roles : []
        }));
        setListUsers(processedUserData);
      } else {
        console.error("Received non-array data:", userData);
        setListUsers([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Network or other error:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete the user?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/Users/${id}`);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">User List</h1>
        <Link
          to="/portal/add-user"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Add User
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Veprimet</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Veprimet</th>
                  </tr>
                </tfoot>
                <tbody>
                  {listUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{Array.isArray(user.roles) ? user.roles.join(", ") : "No roles"}</td>
                      <td>
                        
                        <Link
                          to={`/portal/update-user/${user.id}`}
                          className="btn btn-info btn-sm mr-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-danger btn-sm mr-1"
                        >
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

export default ListUsers;
