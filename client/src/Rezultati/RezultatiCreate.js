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
            golatEkipi1: "", // Updated property name
            golatEkipi2: "" // Updated property name
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

            if (!values.golatEkipi1) {
                errors.golatEkipi1 = "Please enter the result for Ekipi 1";
            }

            if (!values.golatEkipi2) {
                errors.golatEkipi2 = "Please enter the result for Ekipi 2";
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.post('http://localhost:5178/api/Rezultati', values);
                navigate("/portal/rezultati-list");
            } catch (error) {
                console.error("Failed to create new result", error);
                alert("Creation failed");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Create New Rezultat</h3>
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
                            <label>Result for Ekipi 1</label>
                            <input
                                name='golatEkipi1'
                                value={formik.values.golatEkipi1}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.golatEkipi1 ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.golatEkipi1}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Result for Ekipi 2</label>
                            <input
                                name='golatEkipi2'
                                value={formik.values.golatEkipi2}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.golatEkipi2 ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.golatEkipi2}</span>
                        </div>
                    </div>

                    <div className='col-lg-6 mt-3'>
                        <input
                            type="submit"
                            value={isLoading ? "Creating..." : "Create"}
                            className="btn btn-primary"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default RezultatCreate;
