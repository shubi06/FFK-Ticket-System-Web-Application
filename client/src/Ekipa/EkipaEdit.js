import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EkipaEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEkipaData();
    }, []);

    let fetchEkipaData = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/Ekipa/${params.id}`);
            formik.setValues(response.data);
        } catch (error) {
            console.error('Failed to fetch ekipa data', error);
        }
    }

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
                await axios.put(`http://localhost:5178/api/Ekipa/${params.id}`, values);
                navigate("/ekipa-list");
            } catch (error) {
                console.error("Failed to update the club", error);
                alert("Update failed");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Edit Ekipa - ID: {params.id}</h3>
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
                            <label>Coach</label>
                            <input
                                name='trajneri'
                                value={formik.values.trajneri}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.trajneri ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.trajneri}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Year of Foundation</label>
                            <input
                                name='vitiThemelimit'
                                value={formik.values.vitiThemelimit}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.vitiThemelimit ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.vitiThemelimit}</span>
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
                            <span style={{ color: "red" }}>{formik.errors.nrTitujve}</span>
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

export default EkipaEdit;
