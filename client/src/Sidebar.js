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
        <Link className="nav-link" to="/portal/bileta-list">
          <span>BILETAT</span>
        </Link>
      </li>

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
        <Link className="nav-link" to="/portal/stadiumi-list">
          <span>STADIUMI</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/portal/ndeshja-list">
          <span>NDESHJA</span>
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

      <li className="nav-item active">
        <Link className="nav-link" to="/portal/lojtaret-superlige-list">
          <span>LOJTARET E SUPERLIGES</span>
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
        <Link className="nav-link" to="/portal/contacts">
          <span>CONTACTS</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/portal/ekipa">
          <span>EKIPA E SUPERLIGES</span>
        </Link>
      </li>

      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/portal/ndeshja-superlige-list">
          <span>NDESHJA SUPERLIGE</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/portal/referi-list">
          <span>Referi</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/portal/rezultati-list">
          <span>Rezultati</span>
        </Link>
      </li>

      <li className="nav-item active">
        <Link className="nav-link" to="/portal/kontabiliteti-list">
          <span>KONTABILITETI</span>
        </Link>
      </li>
    </ul>
  );
}

export default Sidebar;
