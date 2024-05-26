import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, AuthContext } from './Services/AuthContext';
import { UserProvider } from './Services/UserContext';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Portal from "./Portal";
import './App.css';
import './sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from'./Components/Home';
import Player from "./Components/Player";
import Header from "./Components/Header";
import Slider from './Components/Slider';
import Stadium from './Stadium';


const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Vendosni rrugët ku dëshironi të fshehni Header
  const hideHeaderPaths = ['/portal'];

  const shouldShowHeader = !hideHeaderPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path='/player' element={<Player/>}/>
        <Route path='/header' element={<Header/>}/>
        <Route path='/slider' element={<Slider/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stadium" element={<Stadium />} />
        <Route path="/portal/*" element={
          <PrivateRoute allowedRoles={['Admin']}>
            <Portal />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
};


const PrivateRoute = ({ children, allowedRoles }) => {
  const { authData } = useContext(AuthContext);
  console.log("Auth Data:", authData);
  return authData && allowedRoles.includes(authData.role) ? children : <Navigate to="/login" />;
};

export default App;
