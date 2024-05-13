import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Services/UserContext';

export default function Register() {
    const { register, error } = useUser();
    const navigate = useNavigate();  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [success, setSuccess] = useState(false);  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await register(formData);  
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');  
            }, 3000); 
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form className="user" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-user"
                                                name="name"
                                                id="exampleInputName" aria-describedby="nameHelp"
                                                placeholder="Enter Name"
                                                value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                name="email"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."
                                                value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                name="password"
                                                id="exampleInputPassword" placeholder="Password"
                                                value={formData.password} onChange={handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                name="confirmPassword"
                                                id="exampleInputConfirmPassword" placeholder="Confirm Password"
                                                value={formData.confirmPassword} onChange={handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Register Account
                                        </button>
                                        {success && <div className="alert alert-success mt-2">You have registered successfully!</div>}
                                        {error && <p className="text-danger">{error}</p>}
                                        <hr />
                                    </form>
                                    <div className="text-center">
                                        <a className="small" href="login">Already have an account? Login!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
