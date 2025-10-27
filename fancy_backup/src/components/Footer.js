// src/components/Footer.js
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h4>About</h4>
          <p>
            Sanju's Fancy Store — stylish products curated with love.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="/gallery">Gallery</a>
          <a href="/contact">Feedback</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: sanjusfancy.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Sanju's Fancy Store — Eriyode -Vadamadurai.
      </div>
    </footer>
  );
};

export default Footer;
