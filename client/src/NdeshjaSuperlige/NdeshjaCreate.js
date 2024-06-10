import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function NdeshjaCreate() {
    const [isLoading, setLoading] = useState(false);

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
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                console.log('Submitting form with values:', values); // Debugging line
                await axios.post("http://localhost:5178/api/NdeshjaSuperliges", values);
                resetForm();
                alert('Match created successfully!');
            } catch (error) {
                console.error('Submission failed', error.response ? error.response.data : error.message);
                alert('Failed to create match. Please try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="Ekipa1">Ekipa 1</label>
                <input
                    type="text"
                    className="form-control"
                    id="Ekipa1"
                    name="Ekipa1"
                    value={formik.values.Ekipa1}
                    onChange={formik.handleChange}
                />
                {formik.errors.Ekipa1 && <div className="text-danger">{formik.errors.Ekipa1}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Ekipa2">Ekipa 2</label>
                <input
                    type="text"
                    className="form-control"
                    id="Ekipa2"
                    name="Ekipa2"
                    value={formik.values.Ekipa2}
                    onChange={formik.handleChange}
                />
                {formik.errors.Ekipa2 && <div className="text-danger">{formik.errors.Ekipa2}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="DataENdeshjes">Data E Ndeshjes</label>
                <input
                    type="date"
                    className="form-control"
                    id="DataENdeshjes"
                    name="DataENdeshjes"
                    value={formik.values.DataENdeshjes}
                    onChange={formik.handleChange}
                />
                {formik.errors.DataENdeshjes && <div className="text-danger">{formik.errors.DataENdeshjes}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="StatusiId">Status ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="StatusiId"
                    name="StatusiId"
                    value={formik.values.StatusiId}
                    onChange={formik.handleChange}
                />
                {formik.errors.StatusiId && <div className="text-danger">{formik.errors.StatusiId}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="SuperligaId">Superliga ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="SuperligaId"
                    name="SuperligaId"
                    value={formik.values.SuperligaId}
                    onChange={formik.handleChange}
                />
                {formik.errors.SuperligaId && <div className="text-danger">{formik.errors.SuperligaId}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="EkipaId">Ekipa ID</label>
                <input
                    type="number"
                    className="form-control"
                    id="EkipaId"
                    name="EkipaId"
                    value={formik.values.EkipaId}
                    onChange={formik.handleChange}
                />
                {formik.errors.EkipaId && <div className="text-danger">{formik.errors.EkipaId}</div>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Match"}
            </button>
        </form>
    );
}

export default NdeshjaCreate;
