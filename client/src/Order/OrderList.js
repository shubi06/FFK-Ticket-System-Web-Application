import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5178/api/order");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this order?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5178/api/order/${id}`);
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Orders</h1>
        
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Orders Table</h6>
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
                    <th>User ID</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Cmimi</th>
                    <th>ID Ndeshjes</th>
                    <th>ID Sekorit</th>
                    <th>Ulesja</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userId}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.status}</td>
                      <td>{order.firstName}</td>
                      <td>{order.lastName}</td>
                      <td>{order.city}</td>
                      <td>{order.cmimi}</td>
                      <td>{order.ndeshjaId}</td>
                      <td>{order.sektoriUlseveId}</td>
                      <td>{order.ulesjaId}</td>
                    
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

export default OrderList;
