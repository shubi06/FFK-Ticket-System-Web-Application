import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RezultatDelete() {
    const params = useParams();
    const navigate = useNavigate();
    const [rezultat, setRezultat] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchRezultat();
    }, []);

    const fetchRezultat = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5178/api/Rezultati/${params.id}`);
            setRezultat(response.data);
        } catch (error) {
            console.error('Failed to fetch rezultat data', error);
            navigate("/portal/rezultati-list");  // Redirect if the fetch fails
        } finally {
            setLoading(false);
        }
    };

    const deleteRezultat = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this rezultat?");
        if (confirmDelete) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5178/api/Rezultati/${params.id}`);
                navigate("/portal/rezultati-list");
            } catch (error) {
                console.error('Failed to delete rezultat', error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!rezultat) {
        return <div>No Rezultat found</div>;
    }

    return (
        <>
            <h3>Delete Rezultat - ID: {params.id}</h3>
            <div className='container'>
                <div>
                    <p>Are you sure you want to delete the following rezultat?</p>
                    <p><strong>Club Name:</strong> {rezultat.emriKlubit}</p>
                    <p><strong>Opponent's Name:</strong> {rezultat.kundershtari}</p>
                    <p><strong>Match Date:</strong> {rezultat.dataNdeshjes}</p>
                    <p><strong>Result:</strong> {rezultat.rezultati}</p>
                    <button onClick={deleteRezultat} className="btn btn-danger mr-2">
                        Delete
                    </button>
                    <button onClick={() => navigate("/rezultati-list")} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default RezultatDelete;
