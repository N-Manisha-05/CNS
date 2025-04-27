import React from 'react';
import './Info.css';
import Navbar from './Navbar';
import Contact from './Contact';
const blocks = [
  {
   name: "Academic Block 1",
    description: `This block houses classrooms, seminar halls, and faculty offices. Equipped with projectors, whiteboards, and good seating.<br />
<strong>Director's Office:</strong> G001<br />
<strong>Finance Office:</strong> G002<br />
<strong>Scholarship Office:</strong> G007<br/>
<strong>Dean of Academics Office:</strong> G017<br/>
<strong>Dean of Academics:</strong> G018<br/>
<strong>Examination Cell:</strong> S001<br/>
`,
    image: "/images/10.jpeg"
  },
  {
    name: "Academic Block 2",
    description: `This block houses classrooms, seminar halls, and faculty offices. Equipped with projectors, whiteboards, and good seating.<br/>
    <strong>Administration Office:</strong> G001<br/>
    <strong>Dean of Student Welfare(DSW):</strong>F013<br/>
    <strong>IT Infra:</strong> F007<br/>
  `,
    image: "/images/2.jpeg"
  },
  {
    name: "Library",
    description: "A fully equipped central library with thousands of academic books, digital resources, and a quiet study space.",
    image: "/images/bg.jpeg"
  },
  {
    name: "CSE Block",
    description: "Student accommodation with mess facilities, 24/7 water and power supply, and recreational rooms.",
    image: "/images/7.jpeg"
  },
  {
    name: "Computer Center",
    description: "This block includes Director's office, administration staff, and official meeting halls.",
    image: "/images/14.jpeg"
  }
];

const Info = () => {
  return (
    <>
    <Navbar/>
    <div className="info-page">
      <h1>Campus Block Information</h1>
      <div className="block-list">
        {blocks.map((block, index) => (
          <div className="block-card" key={index}>
            <img src={block.image} alt={block.name} className="block-image" />
            <div className="block-content">
              <h2>{block.name}</h2>
              <p dangerouslySetInnerHTML={{ __html: block.description }}></p>

              {/* <p>{block.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Contact/>
    </>
  );
};

export default Info;
