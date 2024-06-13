import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ReferiEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReferiData();
    }, []);

    const fetchReferiData = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/Referi/${params.id}`);
            formik.setValues(response.data);
        } catch (error) {
            console.error('Failed to fetch referi data', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            Emri: "",
            Mbiemri: "",
            Kombesia: "",
            Mosha: ""
        },
        validate: (values) => {
            let errors = {};

            if (!values.Emri) {
                errors.Emri = "Please enter the first name";
            } else if (values.Emri.length < 3) {
                errors.Emri = "First name should be at least 3 characters long";
            } else if (values.Emri.length > 50) {
                errors.Emri = "First name should not exceed 50 characters";
            }

            if (!values.Mbiemri) {
                errors.Mbiemri = "Please enter the last name";
            } else if (values.Mbiemri.length < 3) {
                errors.Mbiemri = "Last name should be at least 3 characters long";
            } else if (values.Mbiemri.length > 50) {
                errors.Mbiemri = "Last name should not exceed 50 characters";
            }

            if (!values.Kombesia) {
                errors.Kombesia = "Please enter the nationality";
            }

            if (!values.Mosha) {
                errors.Mosha = "Please enter the age";
            } else if (isNaN(values.Mosha)) {
                errors.Mosha = "Age must be a number";
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.put(`http://localhost:5178/api/Referi/${params.id}`, values);
                navigate("/portal/referi-list");
            } catch (error) {
                console.error("Failed to update the referee", error);
                alert("Update failed");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Edit Referee - ID: {params.id}</h3>
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>First Name</label>
                            <input
                                name='Emri'
                                value={formik.values.Emri}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.Emri ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.Emri}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Last Name</label>
                            <input
                                name='Mbiemri'
                                value={formik.values.Mbiemri}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.Mbiemri ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.Mbiemri}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Nationality</label>
                            <input
                                name='Kombesia'
                                value={formik.values.Kombesia}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.Kombesia ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.Kombesia}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Age</label>
                            <input
                                name='Mosha'
                                value={formik.values.Mosha}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.Mosha ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.Mosha}</span>
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

export default ReferiEdit;
