import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./sb-admin-2.min.css";
import { UserProvider } from './Services/UserContext';

import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import { AuthProvider, AuthContext } from './Services/AuthContext';
import Userlist from "./Userlist";
import Portal from "./Portal";
import UserCreate from "./UserCreate";
import UserView from "./UserView";
import UserEdit from "./UserEdit";
import Selektorlist from "./Selektort/SelektorList";
import SelektorCreate from "./Selektort/SelektorCreate";
import SelektorEdit from "./Selektort/SelektorEdit";
import SelektorDelete from "./Selektort/SelektorDelete";
import Stafilist from "./Stafi/StafiList";
import StafiCreate from "./Stafi/StafiCreate";
import StafiEdit from "./Stafi/StafiEdit";
import StafiDelete from "./Stafi/StafiDelete";

const App = () => {
  
    
   
  return (
    <AuthProvider> {/* AuthProvider wraps the entire app to manage authentication state */}
      <UserProvider> {/* UserProvider also wraps around Routes for user data management */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portal" element={<PrivateRoute> {/* A private route to check if the user is authenticated */}
              <Portal>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="user-list" element={<Userlist />} />
                <Route path="create-user" element={<UserCreate />} />
                <Route path="user-view/:id" element={<UserView />} />
                <Route path="user-edit/:id" element={<UserEdit />} />
                <Route path="selektor-list" element={<Selektorlist />} />
                <Route path="selektor-create" element={<SelektorCreate />} />
                <Route path="selektor-edit/:id" element={<SelektorEdit />} />
                <Route path="selektor-delete/:id" element={<SelektorDelete />} />
                <Route path="stafi-list" element={<Stafilist />} />
                <Route path="stafi-create" element={<StafiCreate />} />
                <Route path="stafi-edit/:id" element={<StafiEdit />} />
                <Route path="stafi-delete/:id" element={<StafiDelete />} />
              </Portal>
            </PrivateRoute>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);
  return authData ? children : <Navigate to="/login" />;
};

export default App;
