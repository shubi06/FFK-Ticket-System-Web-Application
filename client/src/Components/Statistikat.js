import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import axios from 'axios';

import './Statistikat.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement);

const Statistikat = ({ filter }) => {
    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get('http://localhost:5178/api/statistikat/best-players');
                setReportData(response.data);
            } catch (error) {
                setError("Error fetching report data");
                console.error("Error fetching report data", error);
            }
        };

        fetchReportData();
    }, []);

    const getFilteredData = () => {
        if (!reportData) return [];

        switch (filter) {
            case 'gola':
                return reportData.topGoalScorer ? [reportData.topGoalScorer] : [];
            case 'asiste':
                return reportData.topAssistProvider ? [reportData.topAssistProvider] : [];
            case 'mosha':
                return reportData.oldestPlayer ? [reportData.oldestPlayer] : [];
            default:
                return [];
        }
    };

    const filteredData = getFilteredData();

    const chartData = {
        labels: filteredData.length > 0 ? filteredData.map(player => `${player.emri} ${player.mbiemri}`) : [],
        datasets: [
            {
                label: 'Goals',
                data: filteredData.length > 0 ? filteredData.map(player => player.gola) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Assists',
                data: filteredData.length > 0 ? filteredData.map(player => player.asiste) : [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            },
            {
                label: 'Age',
                data: filteredData.length > 0 ? filteredData.map(player => player.mosha) : [],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
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
                text: `Top Player: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className='col-xl-12 col-lg-12'>
            {error ? (
                <p>{error}</p>
            ) : reportData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default Statistikat;
