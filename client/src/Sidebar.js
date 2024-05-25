import {
  faFaceLaughWink,
  faTachographDigital,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15"></div>
        <div className="sidebar-brand-text mx-3">FFK</div>
      
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/portal/dashboard">
          <FontAwesomeIcon
            icon={faTachographDigital}
            style={{ marginRight: "0.5rem" }}
          />
          <span>Dashboard</span>
        </Link>
      </li>
      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />
      {/* <!-- Nav Item - Users --> */}
    


      <li className="nav-item active">
        <Link className="nav-link" to="/portal/shteti-list">
          <span>SHTETI</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/portal/kombetarja-list">
          <span>KOMBETARJA</span>
        </Link>
      </li>


      <li className="nav-item active">
        <Link className="nav-link" to="/portal/selektor-list">
          <span>SELEKTORI</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Stafin --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/portal/stafi-list">
          <span>STAFI</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/portal/lojtaret-list">
          <span>LOJTARET E KOMBETARES</span>
        </Link>
      </li>

        {/* <!-- Nav Item - Selektort --> */}
        <li className="nav-item active">
        <Link className="nav-link" to="/portal/user-list">
          <span>SUPERLIGA</span>
        </Link>
      </li>

   {/* <!-- Nav Item - Users --> */}
   <li className="nav-item active">
        <Link className="nav-link" to="/portal/list-users">
          <span>USERS</span>
        </Link>
      </li>


      <li className="nav-item active">
        <Link className="nav-link" to="/portal/ndeshja-list">
          <span>Ndeshja</span>
        </Link>
      </li>






    </ul>
  );
}

export default Sidebar;
