// App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./Services/AuthContext";
import { UserProvider } from "./Services/UserContext";
import { CartProvider } from "./Services/CartContext";
import { NavigationProgressProvider } from "./Services/NavigationProgressContext";
import PrivateRoute from "./Services/PrivateRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Portal from "./Portal";
import Home from "./Components/Home";
import Player from "./Components/Player";
import Header from "./Components/Header";
import Slider from "./Components/Slider";
import Stadium from "./Stadium";
import Cart from "./Components/Cart";
import Seats from "./Seats";
import About from "./Components/About";

import Contact from "./Components/ContactForm";

import SuperligaTable from "./Components/SuperligaTable";
import NdeshjaSuperligesTable from "./Components/NdeshjaSuperligesTable"; // Import the new component


import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

import "./App.css";
import "./sb-admin-2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Success from "./Success";
import { TimerProvider } from './Services/TimerContext';
import MatchesAndResults from "./Components/MatchesAndResults";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <NavigationProgressProvider>
            <TimerProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </TimerProvider>
          </NavigationProgressProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();

  
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
        <Route path="/ndeshjet" element={<NdeshjaSuperligesTable />} /> {/* Use element instead of component */}
        <Route path="/header" element={<Header />} />
        <Route path="/slider" element={<Slider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stadium" element={<Stadium />} />
        <Route path="/stadium/:matchId" element={<Stadium />} />
        <Route path="/stadium/:sectorId/:matchId" element={<Stadium />} />
        <Route path="/seats/:sectorId/:ndeshjaId" element={<Seats />} />
        <Route path="/success" element={<Success />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/matchesandresults" element={<MatchesAndResults />} />

        <Route path="/superliga" element={<SuperligaTable />} />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route
          path="/portal/*"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <Portal />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
