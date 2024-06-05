import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RezultatCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            emriKlubit: "",
            kundershtari: "",
            dataNdeshjes: "",
            rezultati: ""
        },
        validate: (values) => {
            let errors = {};

            if (!values.emriKlubit) {
                errors.emriKlubit = "Please enter the club name";
            } else if (values.emriKlubit.length < 3) {
                errors.emriKlubit = "Club name should be at least 3 characters long";
            } else if (values.emriKlubit.length > 50) {
                errors.emriKlubit = "Club name should not exceed 50 characters";
            }

            if (!values.kundershtari) {
                errors.kundershtari = "Please enter the opponent's name";
            } else if (values.kundershtari.length < 3) {
                errors.kundershtari = "Opponent's name should be at least 3 characters long";
            } else if (values.kundershtari.length > 50) {
                errors.kundershtari = "Opponent's name should not exceed 50 characters";
            }

            if (!values.dataNdeshjes) {
                errors.dataNdeshjes = "Please enter the match date";
            } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dataNdeshjes)) {
                errors.dataNdeshjes = "Please enter a valid date (YYYY-MM-DD)";
            }

            if (!values.rezultati) {
                errors.rezultati = "Please enter the result";
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.post("http://localhost:5178/api/Rezultati", values);
                navigate("/rezultati-list");
            } catch (error) {
                console.error("Submission failed", error);
                alert("Failed to create the result");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className="col-lg-6">
                        <label>Club Name</label>
                        <input
                            name='emriKlubit'
                            value={formik.values.emriKlubit}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.emriKlubit ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.emriKlubit}</div>
                    </div>

                    <div className="col-lg-6">
                        <label>Opponent's Name</label>
                        <input
                            name='kundershtari'
                            value={formik.values.kundershtari}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.kundershtari ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.kundershtari}</div>
                    </div>

                    <div className="col-lg-6">
                        <label>Match Date</label>
                        <input
                            name='dataNdeshjes'
                            value={formik.values.dataNdeshjes}
                            onChange={formik.handleChange}
                            type="date"
                            className={`form-control ${formik.errors.dataNdeshjes ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.dataNdeshjes}</div>
                    </div>

                    <div className="col-lg-6">
                        <label>Result</label>
                        <input
                            name='rezultati'
                            value={formik.values.rezultati}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.rezultati ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.rezultati}</div>
                    </div>

                    <div className='col-lg-12 mt-3'>
                        <button type="submit" disabled={isLoading} className='btn btn-primary'>
                            {isLoading ? "Submitting..." : "Create"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RezultatCreate;
