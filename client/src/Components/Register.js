import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Services/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
    const { register } = useUser();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', content: '' });
    const [isLoading, setIsLoading] = useState(false);

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
            setMessage({ type: 'error', content: 'Passwords do not match!' });
            return;
        }

        setIsLoading(true); // Start loading
        setMessage({ type: '', content: '' }); // Clear previous messages

        try {
            await register(formData);
            setMessage({ type: 'success', content: 'You have registered successfully, please confirm your email !' });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            let errorMsg = 'Registration failed. Please try again.';
            if (error.message) {
                errorMsg = error.message;
            }
            setMessage({ type: 'error', content: errorMsg });
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                        <div className="col-lg-6 d-none d-lg-block" style={{ width: '100px', backgroundImage: `url(${require('../Fadil.jpg')})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    {message.content && (
                                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                            {message.content}
                                        </div>
                                    )}
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
                                        <button type="submit" className="btn btn-primary btn-user btn-block" disabled={isLoading}>
                                            {isLoading ? 'Registering...' : 'Register Account'}
                                        </button>
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
