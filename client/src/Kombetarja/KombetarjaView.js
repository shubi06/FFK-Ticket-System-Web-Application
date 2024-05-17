import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function KombetarjaView() {
    const { id } = useParams();
    const [kombetarja, setKombetarja] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKombetarja = async () => {
            try {
                const response = await axios.get(`http://localhost:5178/api/Kombetarja/${id}`);
                setKombetarja(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching kombetarja details', error);
            }
        };
        fetchKombetarja();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (!kombetarja) return <p>No Kombetarja found</p>;

    return (
        <div className='container'>
            <h3>Kombetarja Details</h3>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{kombetarja.emri}</h5>
                    <p className='card-text'>ID: {kombetarja.id}</p>
                    <p className='card-text'>Shteti ID: {kombetarja.shtetiID}</p>
                </div>
            </div>
        </div>
    );
}

export default KombetarjaView;
