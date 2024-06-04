import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EkipaEdit() {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true); // Ensure isLoading is defined

    // Define formik first since it is used inside useCallback
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
                toast.success("Club updated successfully!");
                navigate("/ekipa-list");
            } catch (error) {
                console.error("Failed to update the club", error);
                toast.error("Update failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    });

    const { setValues } = formik;

    const fetchEkipaData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/Ekipa/${params.id}`);
            setValues(response.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Failed to fetch ekipa data', error);
            toast.error("Failed to fetch data.");
            setLoading(false); // Set loading to false even on error
        }
    }, [params.id, setValues]);

    useEffect(() => {
        fetchEkipaData();
    }, [fetchEkipaData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Component JSX...
    return (
        <div className='container'>
            <h3>Edit Ekipa - ID: {params.id}</h3>
            <form onSubmit={formik.handleSubmit}>
                {/* Form fields here */}
                {/* Example form field */}
                <div className="row">
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
                </div>
                {/* More fields based on formik setup */}
            </form>
        </div>
    );
}

export default EkipaEdit;
