import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LojtaretView() {
    const { id } = useParams();
    const [lojtaret, setLojtaret] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLojtaret = async () => {
            try {
                const response = await axios.get(`http://localhost:5178/api/Lojtaret/${id}`);
                setLojtaret(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lojtaret details', error);
            }
        };
        fetchLojtaret();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (!lojtaret) return <p>No lojtaret found</p>;

    return (
        <div className='container'>
            <h3>Lojtari Details</h3>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{lojtaret.emri} {lojtaret.mbiemri}</h5>
                    <p className='card-text'>ID: {lojtaret.id}</p>
                    <p className='card-text'>Emri: {lojtaret.emri}</p>
                    <p className='card-text'>Mbiemri: {lojtaret.mbiemri}</p>
                    <p className='card-text'>Mosha: {lojtaret.mosha}</p>
                    <p className='card-text'>Pozicioni: {lojtaret.pozicioni}</p>
                    <p className='card-text'>Gola: {lojtaret.gola}</p>
                    <p className='card-text'>Asiste: {lojtaret.asiste}</p>
                    <p className='card-text'>NrFaneles: {lojtaret.nrFaneles}</p>
                    {lojtaret.fotoPath && (
                        <div className='card-img'>
                            <p className='card-text'>Foto:</p>
                            <img src={`http://localhost:5178${lojtaret.fotoPath}`} alt={`${lojtaret.emri} ${lojtaret.mbiemri}`} className='img-fluid' />
                        </div>
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default LojtaretView;

