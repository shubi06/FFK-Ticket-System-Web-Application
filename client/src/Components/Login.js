import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Services/AuthContext';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login ,logout,authData} = useContext(AuthContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        const checkAndLogout = () => {
            if (authData) {
                logout();
            }
        };
        checkAndLogout();
    }, [authData, logout]);

    
    const handleLogin = async () => {
      try {
          const response = await axios.post('http://localhost:5178/api/account/login', { email, password });
          const decoded = jwtDecode(response.data.token);
          
          const userData = {
              name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
              email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
              role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          };
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('token', response.data.token);
          login(userData, response.data.token);
          
          if (userData.role === 'Admin') {
              navigate('/portal/dashboard');
          } else {
              navigate('/home');  
          }
      } catch (error) {
          console.error('Login failed:', error);
          
      }
    };
  
    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                        <div className="col-lg-6 d-none d-lg-block" style={{ backgroundImage: `url(${require('../Fadil.jpg')})` }}>
</div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form className="user" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."
                                                value={email}
                                                onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                        <hr />
                                        <a href="index.html" className="btn btn-google btn-user btn-block">
                                            <i className="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                            <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <a className="small" href="register">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            















    );
};

export default Login;
