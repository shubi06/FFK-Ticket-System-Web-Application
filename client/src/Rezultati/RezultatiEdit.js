import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RezultatEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRezultatData();
    }, []);

    const fetchRezultatData = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/Rezultati/${params.id}`);
            formik.setValues(response.data);
        } catch (error) {
            console.error('Failed to fetch rezultat data', error);
        }
    };

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
                await axios.put(`http://localhost:5178/api/Rezultati/${params.id}`, values);
                navigate("/rezultati-list");
            } catch (error) {
                console.error("Failed to update the result", error);
                alert("Update failed");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Edit Rezultat - ID: {params.id}</h3>
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
                            <span style={{ color: "red" }}>{formik.errors.emriKlubit}</span>
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
                            <span style={{ color: "red" }}>{formik.errors.kundershtari}</span>
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
                            <span style={{ color: "red" }}>{formik.errors.dataNdeshjes}</span>
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
                            <span style={{ color: "red" }}>{formik.errors.rezultati}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className='btn btn-primary' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RezultatEdit;
