import React from "react";
import "./Footer.css";
import Logo from "../Assets/Logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="FFK Logo" height="40" />
          <span>FFK</span>
        </div>
        <div className="footer-links">
          <a href="/privacypolicy">Privacy Policy</a>
          <a href="/termsofservice">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com/ffk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.twitter.com/ffk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/ffk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="footer-credit">
          &copy; {new Date().getFullYear()} FFK. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
