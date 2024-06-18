import { useFormik } from 'formik';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NdeshjaEdit() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [ekipat, setEkipat] = useState([]);
    const [statuset, setStatuset] = useState([]);
    const [superligat, setSuperligat] = useState([]);
    const [referet, setReferet] = useState([]);

    useEffect(() => {
        fetchNdeshjaData();
        fetchDropdownData();
    }, []);

    const fetchDropdownData = async () => {
        try {
            const [ekipaRes, statusiRes, superligaRes, referiRes] = await Promise.all([
                axios.get('http://localhost:5178/api/Ekipa'),
                axios.get('http://localhost:5178/api/Statusi'),
                axios.get('http://localhost:5178/api/Superliga'),
                axios.get('http://localhost:5178/api/Referi')
            ]);

            setEkipat(ekipaRes.data);
            setStatuset(statusiRes.data);
            setSuperligat(superligaRes.data);
            setReferet(referiRes.data);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            setEkipat([]);
            setStatuset([]);
            setSuperligat([]);
            setReferet([]);
        }
    };

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
            ReferiId: '',
            GolaEkipa1: '',
            GolaEkipa2: ''
        },
        validate: values => {
            const errors = {};
            if (!values.Ekipa1) {
                errors.Ekipa1 = 'Please select the first team';
            }

            if (!values.Ekipa2) {
                errors.Ekipa2 = 'Please select the second team';
            }

            if (!values.DataENdeshjes) {
                errors.DataENdeshjes = 'Please enter the match date';
            }

            if (!values.StatusiId) {
                errors.StatusiId = 'Please select the status';
            }

            if (!values.SuperligaId) {
                errors.SuperligaId = 'Please select the Superliga';
            }

            if (!values.ReferiId) {
                errors.ReferiId = 'Please select the referee';
            }

            if (values.StatusiId === '1' && (!values.GolaEkipa1 || !values.GolaEkipa2)) { // assuming '2' is 'E Zhvilluar'
                errors.GolaEkipa1 = 'Please enter the goals for the first team';
                errors.GolaEkipa2 = 'Please enter the goals for the second team';
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
                            <select
                                name='Ekipa1'
                                value={formik.values.Ekipa1}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.Ekipa1 ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Team 1</option>
                                {ekipat.map(ekip => (
                                    <option key={ekip.id} value={ekip.id}>
                                        {ekip.emri}
                                    </option>
                                ))}
                            </select>
                            <span style={{ color: 'red' }}>{formik.errors.Ekipa1}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Second Team</label>
                            <select
                                name='Ekipa2'
                                value={formik.values.Ekipa2}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.Ekipa2 ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Team 2</option>
                                {ekipat.map(ekip => (
                                    <option key={ekip.id} value={ekip.id}>
                                        {ekip.emri}
                                    </option>
                                ))}
                            </select>
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
                            <label>Status</label>
                            <select
                                name='StatusiId'
                                value={formik.values.StatusiId}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.StatusiId ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Status</option>
                                {statuset.map(status => (
                                    <option key={status.id} value={status.id}>
                                        {status.emri}
                                    </option>
                                ))}
                            </select>
                            <span style={{ color: 'red' }}>{formik.errors.StatusiId}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Superliga</label>
                            <select
                                name='SuperligaId'
                                value={formik.values.SuperligaId}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.SuperligaId ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Superliga</option>
                                {superligat.map(superliga => (
                                    <option key={superliga.id} value={superliga.id}>
                                        {superliga.emri}
                                    </option>
                                ))}
                            </select>
                            <span style={{ color: 'red' }}>{formik.errors.SuperligaId}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Referee</label>
                            <select
                                name='ReferiId'
                                value={formik.values.ReferiId}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.errors.ReferiId ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Referee</option>
                                {referet.map(referi => (
                                    <option key={referi.id} value={referi.id}>
                                        {referi.emri} {referi.mbiemri}
                                    </option>
                                ))}
                            </select>
                            <span style={{ color: 'red' }}>{formik.errors.ReferiId}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Golat e Ekipës 1</label>
                            <input
                                name='GolaEkipa1'
                                value={formik.values.GolaEkipa1}
                                onChange={formik.handleChange}
                                type="number"
                                className={`form-control ${formik.errors.GolaEkipa1 ? 'is-invalid' : ''}`}
                                disabled={formik.values.StatusiId !== '1'} // assuming '1' is 'E Zhvilluar'
                            />
                            <span style={{ color: 'red' }}>{formik.errors.GolaEkipa1}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Golat e Ekipës 2</label>
                            <input
                                name='GolaEkipa2'
                                value={formik.values.GolaEkipa2}
                                onChange={formik.handleChange}
                                type="number"
                                className={`form-control ${formik.errors.GolaEkipa2 ? 'is-invalid' : ''}`}
                                disabled={formik.values.StatusiId !== '1'} // assuming '1' is 'E Zhvilluar'
                            />
                            <span style={{ color: 'red' }}>{formik.errors.GolaEkipa2}</span>
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
