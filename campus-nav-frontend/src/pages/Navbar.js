import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/*";
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        if (isMobile) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Campus Logo" className="navbar-logo" />
                <span className="navbar-title">Campus Navigation</span>
            </div>

            <button className="menu-btn" onClick={toggleMenu}>
                {menuOpen ? '✕' : '☰'}
            </button>

            <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>
                <Link to="/map" className="nav-link" onClick={closeMenu}>Map</Link>
                <Link to="/Info" className="nav-link" onClick={closeMenu}>Info</Link>
                <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                <Link to="/photos" className="nav-link" onClick={closeMenu}>Gallery</Link>
                <button
                    onClick={() => {
                        closeMenu();
                        handleLogout();
                    }}
                    className="nav-btn logout-btn"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;