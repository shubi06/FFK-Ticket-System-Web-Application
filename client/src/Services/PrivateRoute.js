import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData || !allowedRoles.includes(authData.role)) {
      navigate(-1); // Navigate back to the previous page
    }
  }, [authData, allowedRoles, navigate]);

  if (!authData || !allowedRoles.includes(authData.role)) {
    return null; // Render nothing while navigating
  }

  return children;
};

export default PrivateRoute;
