import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ReferiDelete() {
    const params = useParams();
    const navigate = useNavigate();
    const [referi, setReferi] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchReferi();
    }, []);

    const fetchReferi = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5178/api/Referi/${params.id}`);
            setReferi(response.data);
        } catch (error) {
            console.error('Failed to fetch referi data', error);
            navigate("/referi-list");  // Redirect if the fetch fails
        } finally {
            setLoading(false);
        }
    };

    const deleteReferi = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this referee?");
        if (confirmDelete) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5178/api/Referi/${params.id}`);
                navigate("/referi-list");
            } catch (error) {
                console.error('Failed to delete referee', error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!referi) {
        return <div>No Referee found</div>;
    }

    return (
        <>
            <h3>Delete Referee - ID: {params.id}</h3>
            <div className='container'>
                <div>
                    <p>Are you sure you want to delete the following referee?</p>
                    <p><strong>First Name:</strong> {referi.emri}</p>
                    <p><strong>Last Name:</strong> {referi.mbiemri}</p>
                    <button onClick={deleteReferi} className="btn btn-danger mr-2">
                        Delete
                    </button>
                    <button onClick={() => navigate("/referi-list")} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReferiDelete;
