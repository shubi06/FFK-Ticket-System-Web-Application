import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Services/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, logout, authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/home';

  useEffect(() => {
    if (authData) {
      logout();
    }
  }, [authData, logout]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5178/api/account/login', { email, password }, { withCredentials: true });
      
      const token = response.data.token;
      
      if (!token) {
        throw new Error('Token not found in response');
      }

      if (typeof token !== 'string') {
        throw new Error('Token is not a string');
      }

      const decoded = jwtDecode(token);

      const userData = {
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        emailConfirmed: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/emailConfirmed']
      };

      localStorage.setItem('user', JSON.stringify(userData));
      login(userData, token);

      navigate(from, { replace: true });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); // Set the error message from the server
      } else {
        setError('Login failed. Please try again.');
      }
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
                    <h1 className="h4 text-gray-900 mb-4">Mirë se vini përsëri!</h1>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form className="user" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user"
                        id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Futni Email-in..."
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-user"
                        id="exampleInputPassword" placeholder="Fjalëkalimi"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                        <label className="custom-control-label" htmlFor="customCheck">Më mbaj mend</label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      Kyquni
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <a className="small" href="forgotpassword">Keni harruar fjalëkalimin?</a>
                  </div>
                  <div className="text-center">
                    <a className="small" href="register">Krijo një llogari!</a>
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