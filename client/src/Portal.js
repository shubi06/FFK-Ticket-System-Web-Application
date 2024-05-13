import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Userlist from './Userlist';
import Selektorlist from './Selektort/SelektorList';
import SelektorCreate from './Selektort/SelektorCreate';
import SelektorEdit from './Selektort/SelektorEdit';
import SelektorDelete from './Selektort/SelektorDelete';
import Dashboard from "./Components/Dashboard";
import UserCreate from "./UserCreate";
import UserView from "./UserView";
import UserEdit from "./UserEdit";
import Stafilist from "./Stafi/StafiList";
import StafiCreate from "./Stafi/StafiCreate";
import StafiEdit from "./Stafi/StafiEdit";
import StafiDelete from "./Stafi/StafiDelete";

function Portal() {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Topbar />
          <div className='container-fluid'>
            <Routes>
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
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portal;


