import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser, updateUserRole } from '../Services/UserService';
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [initialRole, setInitialRole] = useState('');
    const [adminCount, setAdminCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getUserData();
        getAdminCount();
    }, []);

    const getAdminCount = async () => {
        try {
            const response = await axios.get('http://localhost:5178/api/Users/admincount');
            setAdminCount(response.data);
        } catch (error) {
            console.error("Error fetching admin count:", error);
        }
    };

    const getUserData = async () => {
        try {
            const response = await getUserById(id);
            const userData = response.data;
            const role = Array.isArray(userData.roles) && userData.roles.length > 0 ? userData.roles[0] : '';
            setInitialRole(role);
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
            } else if (!/^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
                setErrorMessage(''); // Clear any previous error message
                const updatedValues = { 
                    name: values.name, 
                    email: values.email, 
                };
                if (values.password) {
                    updatedValues.password = values.password;
                }

                // Kontrollo nëse përdoruesi është i vetmi administrator
                if (initialRole === 'Admin' && values.roles !== 'Admin' && adminCount === 1) {
                    setErrorMessage("Cannot change the role of the only remaining admin. GO BACK");
                    setLoading(false);
                    return;
                }

                console.log('Updating user with values:', updatedValues);
                const response = await updateUser(id, updatedValues);
                console.log('Update response:', response);
                if (response.status === 200 || response.status === 204) {
                    if (initialRole !== values.roles) {  // Only update role if it changed
                        await updateUserRole(id, values.roles);  // Update role separately
                    }
                    alert('User updated successfully');
                    navigate("/portal/list-users");
                } else {
                    console.error('Unexpected response status:', response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error updating user:", error);
                if (error.response && error.response.data) {
                    console.error('Error details:', error.response.data);
                    setErrorMessage(error.response.data); // Show error message from response
                }
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Update User - Id: {id}</h3>
            <div className='container'>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
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
