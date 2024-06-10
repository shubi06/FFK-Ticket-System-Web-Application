import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Services/AuthContext';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import axios from 'axios';
import Slider from "./Slider";
import Portal from '../Portal';

function Dashboard() {
    const { authData } = useContext(AuthContext);
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const [lojtaretResponse, lojtaretSuperligResponse] = await Promise.all([
                    axios.get("http://localhost:5178/api/Lojtaret/report"),
                    axios.get("http://localhost:5178/api/LojtaretSuperlige")
                ]);

                // Combine the data from both endpoints
                const combinedData = [...lojtaretResponse.data, ...lojtaretSuperligResponse.data];

                // Sort by goals first, then assists
                const sortedData = combinedData.sort((a, b) => b.gola - a.gola || b.asiste - a.asiste);

                // Take the top 3 players
                const top3Players = sortedData.slice(0, 3);

                setReportData(top3Players);
            } catch (error) {
                console.error("Error fetching report data", error);
            }
        };

        fetchReportData();
    }, []);

    // Check if user is authenticated and has admin role
    if (!authData || (authData && authData.role !== 'Admin')) {
        // If not authenticated or not admin, redirect to home page
        return <Navigate to="/" />;
    }

    return (
        <>
            <h1>Welcome, {authData.name}</h1>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <div className='row'>
                <div className='col-xl-12 col-lg-12'>
                    <Portal />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
