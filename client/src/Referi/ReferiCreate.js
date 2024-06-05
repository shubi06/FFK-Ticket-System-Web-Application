import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReferiCreate() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            emri: "",
            mbiemri: ""
        },
        validate: (values) => {
            let errors = {};

            if (!values.emri) {
                errors.emri = "Please enter the first name";
            } else if (values.emri.length < 3) {
                errors.emri = "First name should be at least 3 characters long";
            } else if (values.emri.length > 50) {
                errors.emri = "First name should not exceed 50 characters";
            }

            if (!values.mbiemri) {
                errors.mbiemri = "Please enter the last name";
            } else if (values.mbiemri.length < 3) {
                errors.mbiemri = "Last name should be at least 3 characters long";
            } else if (values.mbiemri.length > 50) {
                errors.mbiemri = "Last name should not exceed 50 characters";
            }

            return errors;
        },
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await axios.post("http://localhost:5178/api/Referi", values);
                navigate("/referi-list");
            } catch (error) {
                console.error("Submission failed", error);
                alert("Failed to create the referee");
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
                        <label>First Name</label>
                        <input
                            name='emri'
                            value={formik.values.emri}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.emri ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.emri}</div>
                    </div>

                    <div className="col-lg-6">
                        <label>Last Name</label>
                        <input
                            name='mbiemri'
                            value={formik.values.mbiemri}
                            onChange={formik.handleChange}
                            type="text"
                            className={`form-control ${formik.errors.mbiemri ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{formik.errors.mbiemri}</div>
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

export default ReferiCreate;
