import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EkipaDelete() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [ekipa, setEkipa] = useState(null);

    useEffect(() => {
        fetchEkipa();
    }, []);

    const fetchEkipa = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5178/api/Ekipa/${id}`);
            setEkipa(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch ekipa data', error);
            navigate("/ekipa-list");  // Redirect if the fetch fails
            setLoading(false);
        }
    };

    const deleteEkipa = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ekipa?");
        if (confirmDelete) {
            setLoading(true);
            try {
                await axios.delete(`http://localhost:5178/api/Ekipa/${id}`);
                navigate("/portal/ekipa-list");
            } catch (error) {
                console.error('Failed to delete ekipa', error);
                setLoading(false);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!ekipa) {
        return <div>No Ekipa found</div>;
    }

    return (
        <>
            <h3>Delete Ekipa - ID: {id}</h3>
            <div className='container'>
                <div>
                    <p>Are you sure you want to delete the following ekipa?</p>
                    <p><strong>Club Name:</strong> {ekipa.emriKlubit}</p>
                    <p><strong>Coach:</strong> {ekipa.trajneri}</p>
                    <p><strong>Year of Establishment:</strong> {ekipa.vitiThemelimit}</p>
                    <p><strong>Number of Titles:</strong> {ekipa.nrTitujve}</p>
                    <button onClick={deleteEkipa} className="btn btn-danger mr-2">
                        Delete
                    </button>
                    <button onClick={() => navigate("/ekipa-list")} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default EkipaDelete;
