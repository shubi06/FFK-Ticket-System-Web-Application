import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NdeshjaDelete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchNdeshja();
    }, []);

    const fetchNdeshja = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5178/api/NdeshjaSuperliges/${id}`);
            if (!response.data) {
                navigate('/portal/ndeshja-list'); // Redirect if the match is not found
            }
        } catch (error) {
            console.error('Failed to fetch match data', error);
            navigate('/portal/ndeshja-list'); // Redirect if the fetch fails
        } finally {
            setLoading(false);
        }
    };

    const deleteNdeshja = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this match?');
        if (confirmDelete) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5178/api/NdeshjaSuperliges/${id}`);
                navigate('/portal/ndeshja-list');
            } catch (error) {
                console.error('Failed to delete match', error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h3>Delete Match - ID: {id}</h3>
            <div className='container'>
                <div>
                    <p>Are you sure you want to delete this match?</p>
                    <button onClick={deleteNdeshja} className="btn btn-danger mr-2">
                        Delete
                    </button>
                    <button onClick={() => navigate('/portal/ndeshja-list')} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default NdeshjaDelete;
