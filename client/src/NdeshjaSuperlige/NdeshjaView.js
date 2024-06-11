
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NdeshjaView() {
    const params = useParams();
    const [ndeshja, setNdeshja] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // On Load
        getNdeshja();
        console.log("Welcome to NdeshjaView");
    }, []);

    const getNdeshja = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/NdeshjaSuperliges/${params.id}`);
            setNdeshja(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            <div>NdeshjaView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Ndeshja View</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            ndeshja && (
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Ekipa 1</th>
                                                <th>Ekipa 2</th>
                                                <th>Data e Ndeshjes</th>
                                                <th>Statusi</th>
                                                <th>Superliga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{ndeshja.id}</td>
                                                <td>{ndeshja.ekipa1}</td>
                                                <td>{ndeshja.ekipa2}</td>
                                                <td>{new Date(ndeshja.dataENdeshjes).toLocaleDateString()}</td>
                                                <td>{ndeshja.statusi ? ndeshja.statusi.emri : 'N/A'}</td>
                                                <td>{ndeshja.superliga ? ndeshja.superliga.emri : 'N/A'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    );
}

export default NdeshjaView;