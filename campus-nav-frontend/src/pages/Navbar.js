// Navbar.js
import React from 'react';

import { Link } from 'react-router-dom';
import './Navbar.css'; // optional for custom styles
import logo from '../assets/logo.jpg'; // adjust path as needed
const handleLogout = () => {
  localStorage.removeItem("token"); // Or whatever key you're using
  window.location.href = "/login"; // Adjust if using React Router
};
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Campus Logo" className="navbar-logo" />
        <span className="navbar-title">Campus Navigation</span>
      </div>

      <div className="navbar-right">
        {/* Your other navbar items here */}
        {/* <button className="nav-btn">Photos</button> */}
        <Link to="/map" className="nav-link">Map</Link>
        <Link to="/Info" className="nav-link">Info</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/photos" className="nav-link" >Gallery</Link>
        <button
     onClick={handleLogout}
     className="nav-btn logout-btn"
    >
      Logout
    </button>
      </div>
    </nav>
  );
};

export default Navbar;
