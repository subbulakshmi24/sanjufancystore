import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import fromt from '../img/sanjulogo.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
          <img src={fromt} alt="sanju" className="logo" ></img>
        <div className="container">
          {/* Logo - only once */}
          <Link to="/" className="navbar-brand">
            {/* Sanju's Fancy Store */}
          </Link>

          {/* Navbar Links */}
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Feedback</Link></li>
            
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
