import React, { useContext, useEffect, useState } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import Card from '../Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../Services/AuthContext';
import axios from 'axios';
ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, 
    LinearScale, Title,
    LinearScale, BarElement, Title
);

function Dashboard() {
    const { authData} = useContext(AuthContext);
    
    const [reportData, setReportData] = useState(null);
    const navigate = useNavigate();


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
 
     if (!authData || authData.role !== 'Admin') {
         return <Navigate to="/not-found" replace />;
     }

     const chartData = {
        labels: reportData ? reportData.map(player => `${player.emri} ${player.mbiemri}`) : [],
        datasets: [
            {
                label: 'Goals',
                data: reportData ? reportData.map(player => player.gola) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Assists',
                data: reportData ? reportData.map(player => player.asiste) : [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Top 3 Players: Goals and Assists'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
        <h1>Welcome, {authData ? authData.name : 'Guest'}</h1>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

                </div>

                <div className='row'>
                <div className='col-xl-12 col-lg-12'>
                    {reportData ? (
                        <Bar data={chartData} options={options} />
                    ) : (
                        <p>Loading chart data...</p>
                    )}
                </div>
            </div>
        </>
    );
}
export default Dashboard;