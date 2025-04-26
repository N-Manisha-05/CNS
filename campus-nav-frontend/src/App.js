// // src/App.js
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Map from "./pages/Map";
// import PhotosPage from "./pages/PhotosPage";
// import About from"./pages/About";
// import Contact from"./pages/Contact";
// import Info from"./pages/Info";
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/map" element={<Map />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//         <Route path="/photos" element={<PhotosPage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/Contact" element={<Contact />} />
//         <Route path="/Info" element={<Info />} />

        
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Map from "./pages/Map";
import PhotosPage from "./pages/PhotosPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Info from "./pages/Info";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/map" element={<Map />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/info" element={<Info />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
