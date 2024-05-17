import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from './Services/AuthContext';
import { UserProvider } from './Services/UserContext';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Portal from "./Portal";
import './App.css';
import './sb-admin-2.min.css';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portal/*" element={
              <PrivateRoute allowedRoles={['Admin']}>
                <Portal />
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const { authData } = useContext(AuthContext);
  console.log("Auth Data:", authData);
  return authData && allowedRoles.includes(authData.role) ? children : <Navigate to="/login" />;
};

export default App;
