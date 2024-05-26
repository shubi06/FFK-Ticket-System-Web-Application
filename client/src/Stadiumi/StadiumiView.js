import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function StadiumiView() {
    const { id } = useParams();
    const [stadiumi, setStadiumet] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStadiumet = async () => {
            try {
                const response = await axios.get(`http://localhost:5178/api/Stadiumi/${id}`);
                setStadiumet(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lojtaret details', error);
            }
        };
        fetchStadiumet();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (!stadiumi) return <p>No Stadiumi found</p>;

    return (
        <div className='container'>
            <h3>Stadiumi Details</h3>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{stadiumi.emri}</h5>
                    <p className='card-text'>ID: {stadiumi.id}</p>
                    <p className='card-text'>Emri: {stadiumi.emri}</p>
                    <p className='card-text'>Kapaciteti: {stadiumi.kapaciteti}</p>
                    <p className='card-text'>Viti Ndertimit: {stadiumi.vitiNdertuar}</p>

                </div>
            </div>
        </div>
    );
}

export default StadiumiView;
