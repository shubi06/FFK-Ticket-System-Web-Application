import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Userlist from "./Userlist";
import Selektorlist from "./Selektort/SelektorList";
import SelektorCreate from "./Selektort/SelektorCreate";
import SelektorEdit from "./Selektort/SelektorEdit";
import SelektorDelete from "./Selektort/SelektorDelete";
import Dashboard from "./Components/Dashboard";
import UserCreate from "./UserCreate";
import UserView from "./UserView";
import UserEdit from "./UserEdit";
import Stafilist from "./Stafi/StafiList";
import StafiCreate from "./Stafi/StafiCreate";
import StafiEdit from "./Stafi/StafiEdit";
import StafiDelete from "./Stafi/StafiDelete";
// Users components
import AddUser from "./Users/AddUser";
import DeleteUser from "./Users/DeleteUser";
import ListUsers from "./Users/ListUsers";
import UpdateUser from "./Users/UpdateUser";
import ShtetiList from "./Shteti/ShtetiList";
import ShtetiView from "./Shteti/ShtetiView";
import KombetarjaList from "./Kombetarja/KombetarjaList";
import KombetarjaEdit from "./Kombetarja/KombetarjaEdit";
import KombetarjaCreate from "./Kombetarja/KombetarjaCreate";
import KombetarjaView from "./Kombetarja/KombetarjaView";
import LojtaretList from "./Lojtaret/LojtaretList";
import LojtaretCreate from "./Lojtaret/LojtaretCreate";
import LojtaretEdit from "./Lojtaret/LojtaretEdit";
import LojtaretView from "./Lojtaret/LojtaretView";

import LojtaretSuperligeList from "./LojtaretSuperlige/LojtaretSuperligeList";
import LojtaretSuperligeCreate from "./LojtaretSuperlige/LojtaretSuperligeCreate";
import LojtaretSuperligeEdit from "./LojtaretSuperlige/LojtaretSuperligeEdit";
import LojtaretSuperligeView from "./LojtaretSuperlige/LojtaretSuperligeView";

import StadiumiList from "./Stadiumi/StadiumiList";
import StadiumiCreate from "./Stadiumi/StadiumiCreate";
import StadiumiEdit from "./Stadiumi/StadiumiEdit";
import StadiumiView from "./Stadiumi/StadiumiView";

import NdeshjaList from "./Ndeshja/NdeshjaList";
import CreateNdeshja from "./Ndeshja/CreateNdeshja";

import ContactList from "./Contact/ContactList";
import ContactView from "./Contact/ContactView";
import ContactEdit from "./Contact/ContactEdit";

import EkipaList from "./Ekipa/EkipaList";
import EkipaCreate from "./Ekipa/EkipaCreate";
import EkipaEdit from "./Ekipa/EkipaEdit";
import EkipaDelete from "./Ekipa/EkipaDelete";
import EkipaView from "./Ekipa/EkipaView";

import NdeshjaSuperligeList from "./NdeshjaSuperlige/NdeshjaList";
import NdeshjaCreate from "./NdeshjaSuperlige/NdeshjaCreate";
import NdeshjaEdit from "./NdeshjaSuperlige/NdeshjaEdit";
import NdeshjaDelete from "./NdeshjaSuperlige/NdeshjaDelete";
import NdeshjaView from "./NdeshjaSuperlige/NdeshjaView";

import ReferiList from "./Referi/ReferiList";
import ReferiCreate from "./Referi/ReferiCreate";
import ReferiEdit from "./Referi/ReferiEdit";
import ReferiDelete from "./Referi/ReferiDelete";
import ReferiView from "./Referi/ReferiView";

import RezultatiList from "./Rezultati/RezultatiList";
import RezultatiCreate from "./Rezultati/RezultatiCreate";
import RezultatiEdit from "./Rezultati/RezultatiEdit";
import RezultatiDelete from "./Rezultati/RezultatiDelete";
import RezultatiView from "./Rezultati/RezultatiView";

import BiletatList from "./Biletat/BiletaList";

import KontabilitetiList from "./Kontabiliteti/KontabilitetiList";
import KontabilitetiCreate from "./Kontabiliteti/KontabilitetiCreate";
import KontabilitetiEdit from "./Kontabiliteti/KontabilitetiEdit";
import KontabilitetiView from "./Kontabiliteti/KontabilitetiView";


function Portal() {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <Topbar />

          <div className="container-fluid">
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

              <Route
                path="lojtaret-superlige-list"
                element={<LojtaretSuperligeList />}
              />
              <Route
                path="lojtaret-superlige-create"
                element={<LojtaretSuperligeCreate />}
              />
              <Route
                path="lojtaret-superlige-edit/:id"
                element={<LojtaretSuperligeEdit />}
              />
              <Route
                path="lojtaret-superlige-view/:id"
                element={<LojtaretSuperligeView />}
              />

              <Route path="ndeshja-list" element={<NdeshjaList />} />
              <Route path="create-ndeshja" element={<CreateNdeshja />} />

              <Route path="stadiumi-list" element={<StadiumiList />} />
              <Route path="stadiumi-create" element={<StadiumiCreate />} />
              <Route path="stadiumi-edit/:id" element={<StadiumiEdit />} />
              <Route path="stadiumi-view/:id" element={<StadiumiView />} />

              <Route path="contacts" element={<ContactList />} />
              <Route path="contact/edit/:id" element={<ContactEdit />} />
              <Route path="contact/view/:id" element={<ContactView />} />

              <Route path="ekipa" element={<EkipaList />} />
              <Route path="ekipa/create" element={<EkipaCreate />} />
              <Route path="ekipa/edit/:id" element={<EkipaEdit />} />
              <Route path="ekipa/delete/:id" element={<EkipaDelete />} />
              <Route path="ekipa/view/:id" element={<EkipaView />} />

              <Route
                path="ndeshja-superlige-list"
                element={<NdeshjaSuperligeList />}
              />
              <Route
                path="create-ndeshja-superlige"
                element={<NdeshjaCreate />}
              />
              <Route
                path="edit-ndeshja-superlige/:id"
                element={<NdeshjaEdit />}
              />
              <Route
                path="delete-ndeshja-superlige/:id"
                element={<NdeshjaDelete />}
              />
              <Route
                path="view-ndeshja-superlige/:id"
                element={<NdeshjaView />}
              />

              <Route path="referi-list" element={<ReferiList />} />
              <Route path="referi/create" element={<ReferiCreate />} />
              <Route path="referi/edit/:id" element={<ReferiEdit />} />
              <Route path="referi/delete/:id" element={<ReferiDelete />} />
              <Route path="referi-view/:id" element={<ReferiView />} />

              <Route path="rezultati-list" element={<RezultatiList />} />
              <Route path="rezultati-create" element={<RezultatiCreate />} />
              <Route path="rezultati/edit/:id" element={<RezultatiEdit />} />
              <Route path="rezultati-view/:id" element={<RezultatiView />} />
              <Route path="rezultati/delete/:id" element={<RezultatiDelete />} /> 
           
              <Route path="bileta-list" element={<BiletatList />} />

              <Route
                path="kontabiliteti-list"
                element={<KontabilitetiList />}
              />
              <Route
                path="kontabiliteti-create"
                element={<KontabilitetiCreate />}
              />
              <Route
                path="kontabiliteti-edit/:id"
                element={<KontabilitetiEdit />}
              />
              <Route
                path="kontabiliteti-view/:id"
                element={<KontabilitetiView />}
              />

              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portal;
