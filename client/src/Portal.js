import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
// Users components
import AddUser from './Users/AddUser';
import DeleteUser from './Users/DeleteUser';
import ListUsers from './Users/ListUsers';
import UpdateUser from './Users/UpdateUser';
import ShtetiList from './Shteti/ShtetiList';
import ShtetiView from './Shteti/ShtetiView';
import KombetarjaList from './Kombetarja/KombetarjaList';
import KombetarjaEdit from './Kombetarja/KombetarjaEdit';
import KombetarjaCreate from './Kombetarja/KombetarjaCreate';
import KombetarjaView from './Kombetarja/KombetarjaView';
import LojtaretList from './Lojtaret/LojtaretList';
import LojtaretCreate from './Lojtaret/LojtaretCreate';
import LojtaretEdit from './Lojtaret/LojtaretEdit';
import LojtaretView from './Lojtaret/LojtaretView';

import NdeshjaList from './Ndeshja/NdeshjaList';
import CreateNdeshja from './Ndeshja/CreateNdeshja';



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
              <Route path="list-users" element={<ListUsers />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="update-user/:id" element={<UpdateUser />} />
              <Route path="delete-user/:id" element={<DeleteUser />} />

              <Route path="shteti-list" element={<ShtetiList />} />
           
              <Route path="kombetarja-list" element={<KombetarjaList />} />
              <Route path="kombetarja-edit/:id" element={<KombetarjaEdit />} />
              <Route path="kombetarja-create" element={<KombetarjaCreate />} />
              <Route path="kombetarja-view/:id" element={<KombetarjaView />} />

              <Route path="lojtaret-list" element={<LojtaretList />} />
              <Route path="lojtaret-create" element={<LojtaretCreate />} />
              <Route path="lojtaret-edit/:id" element={<LojtaretEdit />} />
              <Route path="lojtaret-view/:id" element={<LojtaretView />} />
       
              <Route path='ndeshja-list' element={<NdeshjaList/>}/>
              <Route path='create-ndeshja' element={<CreateNdeshja/>}/>
              
              <Route path="*" element={<div>Page Not Found</div>} />


              
           
            

            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portal;



