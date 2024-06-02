import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EkipaCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            emriKlubit: "",
            trajneri: "",
            vitiThemelimit: "",
            nrTitujve: ""
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

            if (!values.trajneri) {
                errors.trajneri = "Please enter the coach's name";
            } else if (values.trajneri.length < 3) {
                errors.trajneri = "Coach's name should be at least 3 characters long";
            } else if (values.trajneri.length > 50) {
                errors.trajneri = "Coach's name should not exceed 50 characters";
            }

            if (!values.vitiThemelimit) {
                errors.vitiThemelimit = "Please enter the year of foundation";
            } else if (!/^[0-9]+$/.test(values.vitiThemelimit) || parseInt(values.vitiThemelimit) < 1850 || parseInt(values.vitiThemelimit) > new Date().getFullYear()) {
                errors.vitiThemelimit = "Please enter a valid year (after 1850 and not in the future)";
            }

            if (!values.nrTitujve) {
                errors.nrTitujve = "Please enter the number of titles won";
            } else if (!/^[0-9]+$/.test(values.nrTitujve)) {
                errors.nrTitujve = "Number of titles must be a valid number";
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.post("http://localhost:5178/api/Ekipa", values);
                navigate("/ekipa-list");
            } catch (error) {
                console.error("Submission failed", error);
                alert("Failed to create the club");
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
                        <label>Coach</label>
                        <input
                            name='trajneri'
                            value={formik.values.trajneri}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.trajneri ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.trajneri}</div>
                    </div>

                    <div className="col-lg-6">
                        <label>Year of Establishment</label>
                        <input
                            name='vitiThemelimit'
                            value={formik.values.vitiThemelimit}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.vitiThemelimit ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.vitiThemelimit}</div>
                    </div>

                    <div className="col-lg-6">
                        <label>Number of Titles</label>
                        <input
                            name='nrTitujve'
                            value={formik.values.nrTitujve}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.nrTitujve ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.nrTitujve}</div>
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

export default EkipaCreate;
