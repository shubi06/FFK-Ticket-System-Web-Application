import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserRole } from '../Services/UserService';

function UpdateUser() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5178/api/Users/${id}`);
            const userData = response.data;
            const role = Array.isArray(userData.roles) && userData.roles.length > 0 ? userData.roles[0] : '';
            myFormik.setValues({
                name: userData.name ?? '',
                email: userData.email ?? '',
                password: '',
                roles: role
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
            setLoading(false);
        }
    };

    const myFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            roles: "",
        },
        validate: (values) => {
            let errors = {};

            if (!values.name) {
                errors.name = "Please enter name";
            } else if (values.name.length < 3) {
                errors.name = "Name shouldn't be less than 3 letters";
            } else if (values.name.length > 20) {
                errors.name = "Name shouldn't be more than 20 letters";
            }

            if (!values.email) {
                errors.email = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }

            if (!values.roles) {
                errors.roles = "Please select a role";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const updatedValues = { 
                    name: values.name, 
                    email: values.email, 
                    roles: [values.roles],  // Ensure roles is an array
                };
                if (values.password) {
                    updatedValues.password = values.password;
                }
                console.log('Updating user with values:', updatedValues);
                const response = await axios.put(`http://localhost:5178/api/Users/${id}`, updatedValues, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Update response:', response);
                if (response.status === 200 || response.status === 204) {
                    alert('User updated successfully');
                    await updateUserRole(id, values.roles);  // Update role separately
                    navigate("/portal/list-users");
                } else {
                    console.error('Unexpected response status:', response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error updating user:", error);
                if (error.response && error.response.data) {
                    console.error('Error details:', error.response.data);
                }
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Update User - Id: {id}</h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Name</label>
                            <input
                                name='name'
                                value={myFormik.values.name}
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.name ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.name}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Email</label>
                            <input
                                name='email'
                                value={myFormik.values.email}
                                onChange={myFormik.handleChange}
                                type="email"
                                className={`form-control ${myFormik.errors.email ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Password (Leave blank to keep current password)</label>
                            <input
                                name='password'
                                value={myFormik.values.password}
                                onChange={myFormik.handleChange}
                                type="password"
                                className={`form-control ${myFormik.errors.password ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.password}</span>
                        </div>
                        <div className="col-lg-6">
                            <label>Role</label>
                            <select
                                name='roles'
                                value={myFormik.values.roles}
                                onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.roles ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                            <span style={{ color: "red" }}>{myFormik.errors.roles}</span>
                        </div>
                        <div className='col-lg-4 mt-3'>
                            <input
                                disabled={isLoading}
                                type="submit"
                                value={isLoading ? "Updating..." : "Update"}
                                className='btn btn-primary'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateUser;
