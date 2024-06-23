import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext';
import Statistikat from './Statistikat';

import './Statistikat.css';

function Dashboard() {
    const { authData } = useContext(AuthContext);
    const [filter, setFilter] = useState('gola'); // Vlera fillestare

    const handleFilterChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    if (!authData || authData.role !== 'Admin') {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <>
            <h1>Welcome, {authData ? authData.name : 'Guest'}</h1>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <div className="filter-container">
                <label htmlFor="filter">Filter by:</label>
                <select id="filter" onChange={handleFilterChange}>
                    <option value="gola">Goals</option>
                    <option value="asiste">Assists</option>
                    <option value="mosha">Age</option>
                </select>
            </div>
            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <Statistikat filter={filter} /> {/* Kalimi i filtrit si props */}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
