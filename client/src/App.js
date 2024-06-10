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
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import Sidebar from "./Sidebar";
import RezultatiView from "./Rezultati/RezultatiView";
import ReferiView from "./Referi/ReferiView";

import "./App.css";
import "./sb-admin-2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Determine whether to show header or not
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
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/player" element={<Player />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seats/:sectorId" element={<Seats />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/superliga" element={<SuperligaTable />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/rezultat-view/:id" element={<RezultatiView />} /> {/* Add RezultatiView route */}
        <Route path="/referi-view/:id" element={<ReferiView />} /> {/* Add ReferiView route */}
        <Route
          path="/portal/*"
          element={
            <>
              <Portal />
              {/* <Sidebar /> */}
            </>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
};

export default App;
