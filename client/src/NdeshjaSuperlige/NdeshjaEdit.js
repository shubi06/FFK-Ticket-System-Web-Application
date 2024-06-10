import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NdeshjaEdit() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNdeshjaData();
    }, []);

    const fetchNdeshjaData = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/NdeshjaSuperliges/${id}`);
            formik.setValues(response.data);
        } catch (error) {
            console.error('Failed to fetch match data', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            Ekipa1: '',
            Ekipa2: '',
            DataENdeshjes: '',
            StatusiId: '',
            SuperligaId: '',
            EkipaId: ''
        },
        validate: values => {
            const errors = {};
            if (!values.Ekipa1) {
                errors.Ekipa1 = 'Please enter the first team';
            }

            if (!values.Ekipa2) {
                errors.Ekipa2 = 'Please enter the second team';
            }

            if (!values.DataENdeshjes) {
                errors.DataENdeshjes = 'Please enter the match date';
            }

            if (!values.StatusiId) {
                errors.StatusiId = 'Please enter the status ID';
            }

            if (!values.SuperligaId) {
                errors.SuperligaId = 'Please enter the Superliga ID';
            }

            if (!values.EkipaId) {
                errors.EkipaId = 'Please enter the team ID';
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.put(`http://localhost:5178/api/NdeshjaSuperliges/${id}`, values);
                navigate('/portal/ndeshja-list');
            } catch (error) {
                console.error('Failed to update the match', error);
                alert('Update failed');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Edit Match - ID: {id}</h3>
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>First Team</label>
                            <input
                                name='Ekipa1'
                                value={formik.values.Ekipa1}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.Ekipa1 ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{formik.errors.Ekipa1}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Second Team</label>
                            <input
                                name='Ekipa2'
                                value={formik.values.Ekipa2}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.Ekipa2 ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{formik.errors.Ekipa2}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Match Date</label>
                            <input
                                name='DataENdeshjes'
                                value={formik.values.DataENdeshjes}
                                onChange={formik.handleChange}
                                type="date"
                                className={`form-control ${formik.errors.DataENdeshjes ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{formik.errors.DataENdeshjes}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Status ID</label>
                            <input
                                name='StatusiId'
                                value={formik.values.StatusiId}
                                onChange={formik.handleChange}
                                type="number"
                                className={`form-control ${formik.errors.StatusiId ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{formik.errors.StatusiId}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Superliga ID</label>
                            <input
                                name='SuperligaId'
                                value={formik.values.SuperligaId}
                                onChange={formik.handleChange}
                                type="number"
                                className={`form-control ${formik.errors.SuperligaId ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{formik.errors.SuperligaId}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Team ID</label>
                            <input
                                name='EkipaId'
                                value={formik.values.EkipaId}
                                onChange={formik.handleChange}
                                type="number"
                                className={`form-control ${formik.errors.EkipaId ? 'is-invalid' : ''}`}
                            />
                            <span style={{ color: 'red' }}>{formik.errors.EkipaId}</span>
                        </div>
                        <div className='col-lg-4 mt-3'>
                            <input
                                disabled={isLoading}
                                type="submit"
                                value={isLoading ? 'Updating...' : 'Update'}
                                className='btn btn-primary'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NdeshjaEdit;
