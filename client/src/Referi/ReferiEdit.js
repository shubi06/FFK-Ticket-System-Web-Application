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
                await axios.put(`http://localhost:5178/api/Referi/${params.id}`, values);
                navigate("/referi-list");
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
                                name='emri'
                                value={formik.values.emri}
                                onChange={formik.handleChange}
                                type="text"
                                className={`form-control ${formik.errors.emri ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{formik.errors.emri}</span>
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
                            <span style={{ color: "red" }}>{formik.errors.mbiemri}</span>
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
