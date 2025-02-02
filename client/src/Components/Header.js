import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Header.css";
import { AuthContext } from "../Services/AuthContext";
import Logo from "../Assets/Logo.png";

const Header = () => {
  const { authData, logout } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          <img
            src={Logo}
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
            <LinkContainer to="/matchesandresults">
              <Nav.Link>Biletat</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/player">
              <Nav.Link>Lojtaret</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/superliga">
              <Nav.Link>Tabela</Nav.Link>
            </LinkContainer> */}

            <LinkContainer to="/ndeshjet">
              <Nav.Link>Ndeshjet</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>Rreth Nesh</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Kontakti</Nav.Link>
            </LinkContainer>

            {authData && authData.role === "Admin" && (
              <LinkContainer to="portal/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          <Nav className="ml-auto right-nav">
            {authData ? (
              <>
                <Nav.Link onClick={logout}>Dil</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Kyçu</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Regjistrohu</Nav.Link>
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
