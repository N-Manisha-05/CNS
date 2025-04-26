// src/pages/About.js
import React from 'react';
import './About.css'; // for styling
import Navbar from './Navbar';
import Contact from './Contact';
import collegeImg from '../assets/campus.jpeg';
import director from '../assets/director.jpeg';
import pic from '../assets/pic.jpeg';
const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <div className="about-content">
        <h1>About RGUKT RK Valley</h1>
        <p>
          Rajiv Gandhi University of Knowledge Technologies – RK Valley (also known as IIIT Idupulapaya) is a prestigious autonomous institution located in the Kadapa district of Andhra Pradesh. Established in 2008 by the Government of Andhra Pradesh, the university aims to empower rural youth through high-quality education in technology. The unique 6-year integrated B.Tech program combines intermediate and undergraduate engineering education, fostering academic excellence and innovation. The scenic campus is nestled in lush greenery and promotes research, holistic development, and community living.
        </p>
      </div>
      <div className="about-image">
        <img src={collegeImg} alt="RGUKT RK Valley" />
      </div>
    </div>
    <div className="director-section">
  <div className="director-image">
    <img src={director} alt="Director Kumara Swamy Gupta" />
  </div>
  <div className="director-text">
    <h2>About Our Director</h2>
    <p>
      Dr. Kumara Swamy Gupta, the esteemed Director of RGUKT RK Valley, is a visionary academic leader known for his commitment to educational excellence and student development. With a strong background in academia and administration, he has played a key role in enhancing the academic environment and infrastructure of the institute. Under his dynamic leadership, RGUKT RK Valley has made significant strides in fostering innovation, research, and holistic learning, shaping young minds for a brighter future.
    </p>
  </div>
</div>
<div className="achievements-section">
  <h2>Milestones & Achievements</h2>
  <div className="achievements-content">
    <ul>
      <li><strong>National Recognition:</strong> Ranked among the top emerging technical institutes in India for rural talent development.</li>
      <li><strong>Academic Excellence:</strong> Consistent 90%+ pass rates across all engineering streams with high GATE and GRE qualifiers.</li>
      <li><strong>Research & Innovation:</strong> Published 200+ papers in reputed journals and filed several patents in tech and applied sciences.</li>
      <li><strong>Student Placements:</strong> Successful campus placements in top companies like Infosys, TCS, Cognizant, Capgemini, and HCL.</li>
      <li><strong>Entrepreneurship Support:</strong> Established an on-campus Incubation Center encouraging student startups and innovations.</li>
      <li><strong>Global Exposure:</strong> Active MoUs with international universities for research exchange and internship opportunities.</li>
      <li><strong>Tech Fests & Hackathons:</strong> Host of state-level fests like 'Aarambh', 'Ignite', and university-wide hackathons to nurture innovation.</li>
      <li><strong>Community Impact:</strong> Launched rural outreach programs like digital literacy, health camps, and school mentoring.</li>
    </ul>
    <div className="achievements-image">
      <img
        src={pic}// Replace with actual logo URL
        alt="RGUKT Logo"
      />
    </div>
  </div>
</div>
<Contact/>
    </>
  );
};

export default About;
