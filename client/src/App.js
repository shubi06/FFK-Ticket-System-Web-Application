import React, { useContext } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./Services/AuthContext";
import { UserProvider } from "./Services/UserContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Portal from "./Portal";
import "./App.css";
import "./sb-admin-2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import Player from "./Components/Player";
import Header from "./Components/Header";
import Slider from "./Components/Slider";
import Stadium from "./Stadium";
import Cart from "./Components/Cart";
import Seats from "./Seats";
import { CartProvider } from "./Services/CartContext";
import About from "./Components/About";
import { NavigationProgressProvider } from './Services/NavigationProgressContext';
import PrivateRoute from './Services/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';






const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <NavigationProgressProvider> 
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </NavigationProgressProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Vendosni rrugët ku dëshironi të fshehni Header
  const hideHeaderPaths = ["/portal"];

  const shouldShowHeader = !hideHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/header" element={<Header />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stadium" element={<Stadium />} />
        <Route path="/seats/:sectorId" element={<Seats />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />



        <Route
          path='/portal/*'
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <Portal />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};



export default App;
