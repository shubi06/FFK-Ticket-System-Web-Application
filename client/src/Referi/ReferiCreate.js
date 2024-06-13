import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function ReferiCreate() {
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            Emri: '',
            Mbiemri: '',
            Kombesia: '',
            Mosha: '' // Added Mosha field
        },
        validate: values => {
            const errors = {};
            if (!values.Emri) {
                errors.Emri = 'Please enter the first name';
            } else if (values.Emri.length < 3) {
                errors.Emri = 'First name should be at least 3 characters long';
            } else if (values.Emri.length > 50) {
                errors.Emri = 'First name should not exceed 50 characters';
            }

            if (!values.Mbiemri) {
                errors.Mbiemri = 'Please enter the last name';
            } else if (values.Mbiemri.length < 3) {
                errors.Mbiemri = 'Last name should be at least 3 characters long';
            } else if (values.Mbiemri.length > 50) {
                errors.Mbiemri = 'Last name should not exceed 50 characters';
            }

            if (!values.Kombesia) {
                errors.Kombesia = 'Please enter the nationality';
            }

            if (!values.Mosha) {
                errors.Mosha = 'Please enter the age';
            } else if (isNaN(values.Mosha)) {
                errors.Mosha = 'Age must be a number';
            }

            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                await axios.post("http://localhost:5178/api/Referi", {
                    Emri: values.Emri,
                    Mbiemri: values.Mbiemri,
                    Kombesia: values.Kombesia,
                    Mosha: values.Mosha // Added Mosha field
                });
                resetForm();
                alert('Referee created successfully!');
            } catch (error) {
                console.error('Submission failed', error.response ? error.response.data : error.message);
                alert('Failed to create referee. Please try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="Emri">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="Emri"
                    name="Emri"
                    value={formik.values.Emri}
                    onChange={formik.handleChange}
                />
                {formik.errors.Emri && <div className="text-danger">{formik.errors.Emri}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Mbiemri">Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="Mbiemri"
                    name="Mbiemri"
                    value={formik.values.Mbiemri}
                    onChange={formik.handleChange}
                />
                {formik.errors.Mbiemri && <div className="text-danger">{formik.errors.Mbiemri}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Kombesia">Nationality</label>
                <input
                    type="text"
                    className="form-control"
                    id="Kombesia"
                    name="Kombesia"
                    value={formik.values.Kombesia}
                    onChange={formik.handleChange}
                />
                {formik.errors.Kombesia && <div className="text-danger">{formik.errors.Kombesia}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="Mosha">Age</label>
                <input
                    type="text"
                    className="form-control"
                    id="Mosha"
                    name="Mosha"
                    value={formik.values.Mosha}
                    onChange={formik.handleChange}
                />
                {formik.errors.Mosha && <div className="text-danger">{formik.errors.Mosha}</div>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Create Referee</button>
        </form>
    );
}

export default ReferiCreate;
