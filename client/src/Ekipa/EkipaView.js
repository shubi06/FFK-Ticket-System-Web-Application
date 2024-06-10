/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EkipaView() {
    const params = useParams();
    const [ekipa, setEkipa] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // On Load
        getEkipa();
        console.log("Welcome to EkipaView");
    }, []);

    const getEkipa = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/Ekipa/${params.id}`);
            setEkipa(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            <div>EkipaView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Ekipa View</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            ekipa && (
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Emri Klubit</th>
                                                <th>Trajneri</th>
                                                <th>Viti Themelimit</th>
                                                <th>Nr Titujve</th>
                                                <th>Superliga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{ekipa.id}</td>
                                                <td>{ekipa.emriKlubit}</td>
                                                <td>{ekipa.trajneri}</td>
                                                <td>{ekipa.vitiThemelimit}</td>
                                                <td>{ekipa.nrTitujve}</td>
                                                <td>{ekipa.superliga ? ekipa.superliga.emri : 'N/A'}</td>
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

export default EkipaView;
