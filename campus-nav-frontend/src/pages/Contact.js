import React from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <div className="contact-left">
          <p><FaMapMarkerAlt className="icon" /> <strong>Campus Address:</strong><br />
            Rajiv Gandhi University of Knowledge Technologies – RK Valley<br />
            Rajiv Knowledge Valley (Idupulapaya),<br />
            Vempalli Mandalam, Kadapa District,<br />
            Andhra Pradesh – 516330
          </p>
          <p><FaPhone className="icon" /> <strong>Phone:</strong>  08588 283603</p>
          <p><FaEnvelope className="icon" /> <strong>Email:</strong> <a href="mailto:director@rguktrkv.ac.in">director@rguktrkv.ac.in</a></p>
          <p><FaGlobe className="icon" /> <strong>Website:</strong> <a href="https://www.rguktrkv.ac.in" target="_blank" rel="noopener noreferrer">www.rguktrkv.ac.in</a></p>
        </div>
        <div className="contact-right">
          <h3>Follow Us</h3>
          <ul>
            <li><FaLinkedin className="icon" /><a href="https://www.linkedin.com/school/rgukt-rkv/" target="_blank" rel="noopener noreferrer"> LinkedIn</a></li>
            <li><FaInstagram className="icon" /><a href="https://www.instagram.com/rguraa/" target="_blank" rel="noopener noreferrer"> Instagram</a></li>
            <li><FaFacebook className="icon" /><a href="https://www.facebook.com/rguraa2/" target="_blank" rel="noopener noreferrer"> Facebook</a></li>
            <li><FaTwitter className="icon" /><a href="https://twitter.com/RGURAA1" target="_blank" rel="noopener noreferrer"> Twitter</a></li>
            <li><FaYoutube className="icon" /><a href="https://www.youtube.com/channel/UC6dWpSxZgerdOI8s1uyEjQQ" target="_blank" rel="noopener noreferrer"> YouTube</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
