import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Header.css";
import Login from "./Login";
import Register from "./Register";
import Player from "./Player";
import Logo from "../Assets/Logo.png";
import { AuthContext } from "../Services/AuthContext";
import "./Header.css";

const Header = () => {
  const { authData, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src={Logo} // Replace with your logo path
            height="40"
            alt="lo"
            className="d-inline-block align-top"
          />
          {" FFK"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto left-nav">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/player">
              <Nav.Link>Lojtaret</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>

            {authData && authData.role === "Admin" && (
              <LinkContainer to="/portal/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          <Nav className="ml-auto right-nav">
            {authData ? (
              <>
                <LinkContainer to="/myaccount">
                  <Nav.Link>My Account</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
