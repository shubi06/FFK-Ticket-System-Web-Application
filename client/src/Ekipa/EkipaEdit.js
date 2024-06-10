import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EkipaEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            emriKlubit: "",
            trajneri: "",
            vitiThemelimit: "",
            nrTitujve: "",
            superligaId: ""
        },
        validationSchema: Yup.object({
            emriKlubit: Yup.string().required('Emri Klubit is required').min(3, 'Emri Klubit must be at least 3 characters'),
            trajneri: Yup.string().required('Trajneri is required'),
            vitiThemelimit: Yup.number().required('Viti Themelimit is required').min(1850, 'Viti Themelimit must be after 1850'),
            nrTitujve: Yup.number().required('Nr Titujve is required'),
            superligaId: Yup.number().required('SuperligaId is required')
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                await axios.put(`http://localhost:5178/api/Ekipa/${id}`, values);
                navigate("/portal/ekipa-list");
            } catch (error) {
                console.error("Failed to update the club", error);
                alert("Update failed. Please try again.");
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        const fetchEkipaData = async () => {
            try {
                const response = await axios.get(`http://localhost:5178/api/Ekipa/${id}`);
                formik.setValues(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch ekipa data', error);
                navigate("/portal/ekipa-list");
            }
        };
        fetchEkipaData();
    }, [id, navigate, formik]);

    return (
        <div className='container'>
            <h3>Edit Ekipa - ID: {id}</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Emri Klubit</label>
                    <input
                        name="emriKlubit"
                        onChange={formik.handleChange}
                        value={formik.values.emriKlubit}
                        className={`form-control ${formik.touched.emriKlubit && formik.errors.emriKlubit ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.emriKlubit && formik.errors.emriKlubit ? (
                        <div className="invalid-feedback">{formik.errors.emriKlubit}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Trajneri</label>
                    <input
                        name="trajneri"
                        onChange={formik.handleChange}
                        value={formik.values.trajneri}
                        className={`form-control ${formik.touched.trajneri && formik.errors.trajneri ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.trajneri && formik.errors.trajneri ? (
                        <div className="invalid-feedback">{formik.errors.trajneri}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Viti Themelimit</label>
                    <input
                        name="vitiThemelimit"
                        onChange={formik.handleChange}
                        value={formik.values.vitiThemelimit}
                        type="number"
                        className={`form-control ${formik.touched.vitiThemelimit && formik.errors.vitiThemelimit ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.vitiThemelimit && formik.errors.vitiThemelimit ? (
                        <div className="invalid-feedback">{formik.errors.vitiThemelimit}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Nr Titujve</label>
                    <input
                        name="nrTitujve"
                        onChange={formik.handleChange}
                        value={formik.values.nrTitujve}
                        type="number"
                        className={`form-control ${formik.touched.nrTitujve && formik.errors.nrTitujve ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.nrTitujve && formik.errors.nrTitujve ? (
                        <div className="invalid-feedback">{formik.errors.nrTitujve}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Superliga ID</label>
                    <input
                        name="superligaId"
                        onChange={formik.handleChange}
                        value={formik.values.superligaId}
                        type="number"
                        className={`form-control ${formik.touched.superligaId && formik.errors.superligaId ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.superligaId && formik.errors.superligaId ? (
                        <div className="invalid-feedback">{formik.errors.superligaId}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EkipaEdit;
