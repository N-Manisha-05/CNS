// import React from "react"
// import { Link } from 'react-router-dom';
// import  { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer, useMap, LayersControl } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-control-geocoder";
// import "leaflet-compass/dist/leaflet-compass.min.css";
// import "leaflet-compass";
// //import Fuse from "fuse.js";

// const rkValley = { lat: 14.33499, lng: 78.537372 };
// //import { Link } from 'react-router-dom';


// const RoutingMachine = ({ source, destination, travelMode }) => {
//   const map = useMap();
//   const mapRef = useRef(null);

//   const controlRef = useRef(null);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);

//   useEffect(() => {


//     if (!map) return;
//     if (!mapRef.current) return;

//     // Initialize and add the compass control
//     const compass = new L.Control.Compass({
//       autoActive: true,
//       showDigit: true,
//     });
//     map.addControl(compass);
//     if (!controlRef.current) {
//       controlRef.current = L.Routing.control({
//         waypoints: [],
//         lineOptions: { styles: [{ color: "blue", weight: 4 }] },
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: true,
//         show: false,
//         createMarker: () => null,
//         routeWhileDragging: false,
//       }).addTo(map);
//     }

//     if (source && destination) {
//       controlRef.current.setWaypoints([
//         L.latLng(source.lat, source.lng),
//         L.latLng(destination.lat, destination.lng),
//       ]);

//       controlRef.current.on("routesfound", function (e) {
//         const route = e.routes[0];
//         const dist = route.summary.totalDistance;

//         let speedKmph = travelMode === "bicycle" ? 15 : travelMode === "vehicle" ? 40 : 5;
//         const timeHours = dist / 1000 / speedKmph;
//         const timeMinutes = Math.round(timeHours * 60);

//         setDistance(dist);
//         setDuration(timeMinutes);
//       });
//     }

//     return () => {
//       if (controlRef.current) {
//         controlRef.current.setWaypoints([]);
//         setDistance(null);
//         setDuration(null);
//       }
//     };
//   }, [source, destination, travelMode, map]);

//   return (
//     <>
//       {distance && duration !== null && (
//         <div
//           style={{
//             position: "absolute",
//             top: 70,
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#ffffffee",
//             padding: "10px 16px",
//             border: "2px solid #007bff",
//             borderRadius: "10px",
//             zIndex: 1000,
//             fontSize: "14px",
//             fontWeight: "500",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//           }}
//         >
//           🚩 Distance: {distance < 1000 ? `${Math.round(distance)} m` : `${(distance / 1000).toFixed(2)} km`} &nbsp; | &nbsp;
//           ⏱ Time: {duration} min
//         </div>
//       )}
//     </>
//   );
// };

// const MapPage = () => {
//   const [sourceText, setSourceText] = useState("");
//   const [destinationText, setDestinationText] = useState("");
//   const [sourceCoords, setSourceCoords] = useState(null);
//   const [destinationCoords, setDestinationCoords] = useState(null);
//   const [travelMode, setTravelMode] = useState("walk");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const geocoder = useRef(L.Control.Geocoder.nominatim());
//   const mapRef = useRef(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);


//   const customLocations = {
//     "Library": { lat: 14.335547, lng: 78.538723, type: "Academic", hours: "9AM–6PM", description: "A place for study and research" },
//     "CSE Block": { lat: 14.335914, lng: 78.541347, type: "Department", hours: "9AM–5PM", description: "Department of Computer Science and Engineering" },
//     "ECE Block": { lat: 14.334283, lng: 78.541474, type: "Department", hours: "9AM–5PM", description: "Department of Electronics and Communication Engineering" },
//     "Girls Hostel 2": { lat: 14.334361, lng: 78.538610, type: "Hostel", hours: "24x7", description: "Accommodation for female students" },
//     "Shopping Complex": { lat: 14.337353, lng: 78.534061, type: "Shopping", hours: "10AM–9PM", description: "Place for shopping and dining" },
//     "Hospital": { lat: 14.337157, lng: 78.532596, type: "Medical", hours: "24x7", description: "Emergency medical services" },
//     "Temple": { lat: 14.337074, lng: 78.533307, type: "Religious", hours: "6AM–8PM", description: "Place of worship" },
//     "Sports Complex": { lat: 14.337243, lng: 78.533690, type: "Recreational", hours: "5AM–10PM", description: "Sports facilities" },
//     "Computer Center": { lat: 14.336182, lng: 78.539610, type: "Tech", hours: "9AM–7PM", description: "Computer labs and resources" },
//     "Post Office": { lat: 14.337099, lng: 78.533741, type: "Service", hours: "9AM–4PM", description: "Place to send and receive" },

//     // "Library": { lat: 14.335461, lng: 78.538369 ,type:"study",description:"Consists of many resources to refer and a place where we can study peacefully"},
//     // "CSE Block": { lat: 14.336241, lng: 78.541992,type:"Department",description:"Department of Computer Science and Engineering"},
//     // "ECE Block": { lat: 14.334558, lng: 78.541885 ,type:"Department",description:"Department of Electronics and Communication Engineering"},
//     "MME Block": { lat: 14.337335, lng: 78.541188,type:"Department",hours:"",description:"Department of Metallurgical and Materials Engineering" },
//     "EEE Block": { lat: 14.336851, lng: 78.542395,type:"Department",description:"Department of Electrical and Electronics Engineering" },

//     "Mechanical Block": { lat: 14.336277, lng: 78.543308 ,type:"Department",description:"Department of Mechanical Engineering"},
//     "Chemical Block": { lat: 14.335304, lng: 78.542505 ,type:"Department",description:"Department of Chemical Engineering"},
//     "Civil Block": { lat: 14.334801, lng: 78.543514,type:"",description:"Department of Civil Engineering" },

//     "Academic Block 1": { lat: 14.334841, lng: 78.537223,type:"",description:"" },
//     "Academic Block 2": { lat: 14.335089, lng: 78.539779 ,type:"Department",description:""},

//     "Girls Hostel 1": { lat: 14.334402, lng: 78.538412,type:"Hostel",description:"Accomodation for female students" },

//     "Boys Hostel 1": { lat: 14.334589, lng: 78.536720,type:"Hostel",description:"Accomodation for male students" },
//     "Boys Hostel 2": { lat: 14.334773, lng: 78.540234,type:"Hostel",description:"Accomodation for male students" },


//     "Lab Complex": { lat: 14.336214, lng: 78.538152,type:"Department",description:"place " },
//     "Mechanical workshop": { lat: 14.336200, lng: 78.538661,type:"",description:"" },

//     "IQAC": { lat: 14.336884, lng: 78.540791,type:"",description:"" },
//    "Student Activity Center": { lat: 14.338203, lng: 78.540398,type:"",description:"" },
//     "Power House": { lat: 14.335040, lng: 78.536465,type:"",description:""},
//     "Mess 1234": { lat: 14.333753, lng: 78.538477 ,type:"Food",description:""},
//     "Mess 5678": { lat: 14.333716, lng: 78.538701 ,type:"Food",description:""},

//     "SBI": { lat: 14.337374, lng: 78.534579,type:"Bank",description:"" },
//     "Police Station": { lat: 14.337844, lng: 78.536249,type:"",description:""},
//     "RKV Ground": { lat: 14.337409, lng: 78.537874,type:"Play",description:"" },
//     "Guest House RKV": { lat: 14.331859, lng: 78.536652 ,type:"",description:""},

//     "old campus girls hostel 1": { lat: 14.338275, lng: 78.537744,type:"Hostel",description:"" },
//     "old campus girls hostel 2": { lat: 14.338288, lng: 78.537914,type:"Hostel",description:"" },
//     "old campus boys hostel rho": { lat: 14.339809, lng: 78.537592,type:"Hostel",description:"" },
//     "old campus boys hostel theeta": { lat: 14.339859, lng: 78.537896,type:"Hostel",description:"" },
//     "old campus academic blocks": { lat: 14.339002, lng: 78.537776,type:"Academic",description:"" },
//     "Masjid": { lat: 14.339404, lng: 78.535480,type:"Religious",description:"" },
//     "Laundry": { lat: 14.333134, lng: 78.538775,type:"Laundry",description:"" },

//   };




//   const geocodeLocation = (query) => {
//     const normalized = query.trim().toLowerCase();
//     for (const name in customLocations) {
//       if (name.toLowerCase() === normalized) {
//         return Promise.resolve(customLocations[name]);
//       }
//     }

//     return new Promise((resolve, reject) => {
//       geocoder.current.geocode(query, (results) => {
//         if (results && results.length > 0) {
//           const { center } = results[0];
//           resolve({ lat: center.lat, lng: center.lng });
//         } else {
//           reject("Location not found");
//         }
//       });
//     });
//   };

//   const handleRoute = async () => {
//     try {
//       const src = await geocodeLocation(sourceText);
//       const dest = await geocodeLocation(destinationText);
//       setSourceCoords(src);
//       setDestinationCoords(dest);
//     } catch (err) {
//       alert("Failed to find one or both locations");
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const handleBlockClick = (name, coords) => {
//     setDestinationText(name);
//     setDestinationCoords(coords);
//     mapRef.current?.setView([coords.lat, coords.lng], 18);

//     // Ensure map is initialized before attempting to open a popup
//     if (mapRef.current) {
//       // Show popup with block details
//       const { type, hours, description } = customLocations[name];
//       const popupContent = `
//         <h3>${name}</h3>
//         <p><strong>Type:</strong> ${type}</p>
//         <p><strong>Hours:</strong> ${hours}</p>
//         <p><strong>Description:</strong> ${description}</p>
//       `;
//       L.popup()
//         .setLatLng([coords.lat, coords.lng])
//         .setContent(popupContent)
//         .openOn(mapRef.current);
//     }
//   };

//   return (

//     <div style={{ height: "100vh", width: "100%", position: "relative" }}>
//       {/* Sidebar */}
//       <div style={{
//         position: "absolute",
//         top: 70,
//         left: sidebarOpen ? 10 : -250,
//         width: "240px",
//         transition: "left 0.3s ease-in-out",
//         zIndex: 1000,
//         background: "#fff",
//         padding: "12px",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//         maxHeight: "80vh",
//         overflowY: "auto"
//       }}>
//         <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>📍 Campus Blocks</h3>
//         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//           {Object.entries(customLocations).map(([name, data]) => (
//             <li key={name}
//               onClick={() => handleBlockClick(name, data)}
//               style={{
//                 marginBottom: "10px",
//                 padding: "8px",
//                 background: "#f1f1f1",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontSize: "14px"
//               }}>
//               <strong>{name}</strong><br />
//               <small>🧭 {data.type} | 🕒 {data.hours}</small>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Toggle Sidebar */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         style={{
//           position: "absolute",
//           left: sidebarOpen ? 260 : 10,
//           top: 70,
//           zIndex: 1001,
//           background: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           padding: "6px 10px",
//           cursor: "pointer"
//         }}
//       >
//         {sidebarOpen ? "← Hide" : "→ Show"}
//       </button>

//       {/* Input Bar */}
//       <div style={{
//   position: "absolute",
//   top: 10,
//   left: "50%",
//   transform: "translateX(-50%)",
//   zIndex: 1000,
//   display: "flex",
//   gap: "8px",
//   background: "#fff",
//   padding: "10px",
//   borderRadius: "8px",
//   boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
// }}>
//   <input
//     type="text"
//     placeholder="Source (e.g., Library)"
//     value={sourceText}
//     onChange={(e) => setSourceText(e.target.value)}
//     style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//   />
//   <input
//     type="text"
//     placeholder="Destination (e.g., CSE Block)"
//     value={destinationText}
//     onChange={(e) => setDestinationText(e.target.value)}
//     style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//   />

//   {/* Travel Mode Dropdown */}
//   <select
//     value={travelMode}
//     onChange={(e) => setTravelMode(e.target.value)}
//     style={{
//       padding: "6px 10px",
//       fontSize: "14px",
//       borderRadius: "6px",
//       border: "1px solid #ccc",
//       background: "#fff",
//       cursor: "pointer"
//     }}
//   >
//     <option value="walk">🚶 Walk</option>
//     <option value="bicycle">🚴 Bicycle</option>
//     <option value="vehicle">🚗 Vehicle</option>
//   </select>

//   <button
//     onClick={handleRoute}
//     style={{
//       background: "#28a745",
//       color: "#fff",
//       border: "none",
//       padding: "6px 10px",
//       fontSize: "14px",
//       borderRadius: "6px",
//       cursor: "pointer"
//     }}
//   >
//     Route
//   </button>
//   <div className="photos-link">
//         <Link to="/photos">Photos</Link>
//       </div>
// </div>



//       {/* Map */}
//       <MapContainer

//         center={rkValley}
//         zoom={17}
//         style={{ width: "100%", height: "100%" }}
//         ref={mapRef}
//         whenCreated={(mapInstance) => {
//           mapRef.current = mapInstance;

//           const compass = new L.Control.Compass({
//             autoActive: true,
//             showDigit: true,
//           });

//           compass.addTo(mapRef.current);
//         }}


//       >

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       <LayersControl position="topright">
//   <LayersControl.BaseLayer checked name="OpenStreetMap">
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//   </LayersControl.BaseLayer>

//   <LayersControl.BaseLayer name="Satellite View">
//     <TileLayer
//       attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//       url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//     />
//   </LayersControl.BaseLayer>
// </LayersControl>

//         {sourceCoords && destinationCoords && (
//           <RoutingMachine
//             source={sourceCoords}
//             destination={destinationCoords}
//             travelMode={travelMode}
//           />
//         )}
//       </MapContainer>
//        {/* Logout */}
//        <button
//         onClick={handleLogout}
//         style={{
//           position: "absolute",
//           right: 10,
//           bottom: 25,
//           padding: "8px 12px",
//           background: "red",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           zIndex: 1000,
//         }}
//       >
//         Logout
//       </button>
//     </div>

//   );
// };

// export default MapPage;




// import React from "react"
// import { Link } from 'react-router-dom';
// import  { useEffect, useRef, useState } from "react";
// import { MapContainer, TileLayer, useMap, LayersControl } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-control-geocoder";
// import "leaflet-compass/dist/leaflet-compass.min.css";
// import "leaflet-compass";
// //import Fuse from "fuse.js";

// const rkValley = { lat: 14.33499, lng: 78.537372 };
// //import { Link } from 'react-router-dom';


// const RoutingMachine = ({ source, destination, travelMode }) => {
//   const map = useMap();
//   const mapRef = useRef(null);

//   const controlRef = useRef(null);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);

//   useEffect(() => {


//     if (!map) return;
//     if (!mapRef.current) return;
//   const compass = new L.Control.Compass({
//     autoActive: true,
//     showDigit: true,
//   }).addTo(map);

//     if (!controlRef.current) {
//       controlRef.current = L.Routing.control({
//         waypoints: [],
//         lineOptions: { styles: [{ color: "blue", weight: 4 }] },
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: true,
//         show: false,
//         createMarker: () => null,
//         routeWhileDragging: false,
//       }).addTo(map);
//     }

//     if (source && destination) {
//       controlRef.current.setWaypoints([
//         L.latLng(source.lat, source.lng),
//         L.latLng(destination.lat, destination.lng),
//       ]);

//       controlRef.current.on("routesfound", function (e) {
//         const route = e.routes[0];
//         const dist = route.summary.totalDistance;

//         let speedKmph = travelMode === "bicycle" ? 15 : travelMode === "vehicle" ? 40 : 5;
//         const timeHours = dist / 1000 / speedKmph;
//         const timeMinutes = Math.round(timeHours * 60);

//         setDistance(dist);
//         setDuration(timeMinutes);
//       });
//     }

//     return () => {
//       if (controlRef.current) {
//         controlRef.current.setWaypoints([]);
//         setDistance(null);
//         setDuration(null);
//       }
//     };
//   }, [source, destination, travelMode, map]);

//   return (
//     <>
//       {distance && duration !== null && (
//         <div
//           style={{
//             position: "absolute",
//             top: 70,
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#ffffffee",
//             padding: "10px 16px",
//             border: "2px solid #007bff",
//             borderRadius: "10px",
//             zIndex: 1000,
//             fontSize: "14px",
//             fontWeight: "500",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//           }}
//         >
//           🚩 Distance: {distance < 1000 ? `${Math.round(distance)} m` : `${(distance / 1000).toFixed(2)} km`}

//         </div>
//       )}
//     </>
//   );
// };

// const MapPage = () => {
//   const [sourceText, setSourceText] = useState("");
//   const [destinationText, setDestinationText] = useState("");
//   const [sourceCoords, setSourceCoords] = useState(null);
//   const [destinationCoords, setDestinationCoords] = useState(null);
//   const [travelMode, setTravelMode] = useState("walk");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const geocoder = useRef(L.Control.Geocoder.nominatim());
//   const mapRef = useRef(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);


//   const customLocations = {
//     "Library": { lat: 14.335547, lng: 78.538723, type: "Academic", hours: "9AM–6PM", description: "A place for study and research" },
//     "CSE Block": { lat: 14.335914, lng: 78.541347, type: "Department", hours: "9AM–5PM", description: "Department of Computer Science and Engineering" },
//     "ECE Block": { lat: 14.334283, lng: 78.541474, type: "Department", hours: "9AM–5PM", description: "Department of Electronics and Communication Engineering" },
//     "Girls Hostel 2": { lat: 14.334361, lng: 78.538610, type: "Hostel", hours: "24x7", description: "Accommodation for female students" },
//     "Shopping Complex": { lat: 14.337353, lng: 78.534061, type: "Shopping", hours: "10AM–9PM", description: "Place for shopping and dining" },
//     "Hospital": { lat: 14.337157, lng: 78.532596, type: "Medical", hours: "24x7", description: "Emergency medical services" },
//     "Temple": { lat: 14.337074, lng: 78.533307, type: "Religious", hours: "6AM–8PM", description: "Place of worship" },
//     "Sports Complex": { lat: 14.337243, lng: 78.533690, type: "Recreational", hours: "5AM–10PM", description: "Sports facilities" },
//     "Computer Center": { lat: 14.336182, lng: 78.539610, type: "Tech", hours: "9AM–7PM", description: "Computer labs and resources" },
//     "Post Office": { lat: 14.337099, lng: 78.533741, type: "Service", hours: "9AM–4PM", description: "Place to send and receive" },

//     // "Library": { lat: 14.335461, lng: 78.538369 ,type:"study",description:"Consists of many resources to refer and a place where we can study peacefully"},
//     // "CSE Block": { lat: 14.336241, lng: 78.541992,type:"Department",description:"Department of Computer Science and Engineering"},
//     // "ECE Block": { lat: 14.334558, lng: 78.541885 ,type:"Department",description:"Department of Electronics and Communication Engineering"},
//     "MME Block": { lat: 14.337335, lng: 78.541188,type:"Department",hours:"",description:"Department of Metallurgical and Materials Engineering" },
//     "EEE Block": { lat: 14.336851, lng: 78.542395,type:"Department",description:"Department of Electrical and Electronics Engineering" },

//     "Mechanical Block": { lat: 14.336277, lng: 78.543308 ,type:"Department",description:"Department of Mechanical Engineering"},
//     "Chemical Block": { lat: 14.335304, lng: 78.542505 ,type:"Department",description:"Department of Chemical Engineering"},
//     "Civil Block": { lat: 14.334801, lng: 78.543514,type:"",description:"Department of Civil Engineering" },

//     "Academic Block 1": { lat: 14.334841, lng: 78.537223,type:"",description:"" },
//     "Academic Block 2": { lat: 14.335089, lng: 78.539779 ,type:"Department",description:""},

//     "Girls Hostel 1": { lat: 14.334402, lng: 78.538412,type:"Hostel",description:"Accomodation for female students" },

//     "Boys Hostel 1": { lat: 14.334589, lng: 78.536720,type:"Hostel",description:"Accomodation for male students" },
//     "Boys Hostel 2": { lat: 14.334773, lng: 78.540234,type:"Hostel",description:"Accomodation for male students" },


//     "Lab Complex": { lat: 14.336214, lng: 78.538152,type:"Department",description:"place " },
//     "Mechanical workshop": { lat: 14.336200, lng: 78.538661,type:"",description:"" },

//     "IQAC": { lat: 14.336884, lng: 78.540791,type:"",description:"" },
//    "Student Activity Center": { lat: 14.338203, lng: 78.540398,type:"",description:"" },
//     "Power House": { lat: 14.335040, lng: 78.536465,type:"",description:""},
//     "Mess 1234": { lat: 14.333753, lng: 78.538477 ,type:"Food",description:""},
//     "Mess 5678": { lat: 14.333716, lng: 78.538701 ,type:"Food",description:""},

//     "SBI": { lat: 14.337374, lng: 78.534579,type:"Bank",description:"" },
//     "Police Station": { lat: 14.337844, lng: 78.536249,type:"",description:""},
//     "RKV Ground": { lat: 14.337409, lng: 78.537874,type:"Play",description:"" },
//     "Guest House RKV": { lat: 14.331859, lng: 78.536652 ,type:"",description:""},

//     "old campus girls hostel 1": { lat: 14.338275, lng: 78.537744,type:"Hostel",description:"" },
//     "old campus girls hostel 2": { lat: 14.338288, lng: 78.537914,type:"Hostel",description:"" },
//     "old campus boys hostel rho": { lat: 14.339809, lng: 78.537592,type:"Hostel",description:"" },
//     "old campus boys hostel theeta": { lat: 14.339859, lng: 78.537896,type:"Hostel",description:"" },
//     "old campus academic blocks": { lat: 14.339002, lng: 78.537776,type:"Academic",description:"" },
//     "Masjid": { lat: 14.339404, lng: 78.535480,type:"Religious",description:"" },
//     "Laundry": { lat: 14.333134, lng: 78.538775,type:"Laundry",description:"" },

//   };




//   const geocodeLocation = (query) => {
//     const normalized = query.trim().toLowerCase();
//     for (const name in customLocations) {
//       if (name.toLowerCase() === normalized) {
//         return Promise.resolve(customLocations[name]);
//       }
//     }

//     return new Promise((resolve, reject) => {
//       geocoder.current.geocode(query, (results) => {
//         if (results && results.length > 0) {
//           const { center } = results[0];
//           resolve({ lat: center.lat, lng: center.lng });
//         } else {
//           reject("Location not found");
//         }
//       });
//     });
//   };

//   const handleRoute = async () => {
//     try {
//       const src = await geocodeLocation(sourceText);
//       const dest = await geocodeLocation(destinationText);
//       setSourceCoords(src);
//       setDestinationCoords(dest);
//     } catch (err) {
//       alert("Failed to find one or both locations");
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const handleBlockClick = (name, coords) => {
//     setDestinationText(name);
//     setDestinationCoords(coords);
//     mapRef.current?.setView([coords.lat, coords.lng], 18);

//     // Ensure map is initialized before attempting to open a popup
//     if (mapRef.current) {
//       // Show popup with block details
//       const { type, hours, description } = customLocations[name];
//       const popupContent = `
//       <div>
//         <h3>${name}</h3>
//         <p><strong>Type:</strong> ${type}</p>
//         <p><strong>Hours:</strong> ${hours}</p>
//         <p><strong>Description:</strong> ${description}</p>
//       </div>
//     `;

//       L.popup()
//         .setLatLng([coords.lat, coords.lng])
//         .setContent(popupContent)
//         .openOn(mapRef.current);
//     }
//   };

//   return (

//     <div style={{ height: "100vh", width: "100%", position: "relative" }}>
//       {/* Sidebar */}
//       <div style={{
//         position: "absolute",
//         top: 70,
//         left: sidebarOpen ? 10 : -250,
//         width: "240px",
//         transition: "left 0.3s ease-in-out",
//         zIndex: 1000,
//         background: "#fff",
//         padding: "12px",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//         maxHeight: "80vh",
//         overflowY: "auto"
//       }}>
//         <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>📍 Campus Blocks</h3>
//         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//           {Object.entries(customLocations).map(([name, data]) => (
//             <li key={name}
//               onClick={() => handleBlockClick(name, data)}
//               style={{
//                 marginBottom: "10px",
//                 padding: "8px",
//                 background: "#f1f1f1",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontSize: "14px"
//               }}>
//               <strong>{name}</strong><br />
//               <small>🧭 {data.type} | 🕒 {data.hours}</small>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Toggle Sidebar */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         style={{
//           position: "absolute",
//           left: sidebarOpen ? 260 : 10,
//           top: 70,
//           zIndex: 1001,
//           background: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           padding: "6px 10px",
//           cursor: "pointer"
//         }}
//       >
//         {sidebarOpen ? "← Hide" : "→ Show"}
//       </button>

//       {/* Input Bar */}
//       <div style={{
//   position: "absolute",
//   top: 10,
//   left: "50%",
//   transform: "translateX(-50%)",
//   zIndex: 1000,
//   display: "flex",
//   gap: "8px",
//   background: "#fff",
//   padding: "10px",
//   borderRadius: "8px",
//   boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
// }}>
//   <input
//     type="text"
//     placeholder="Source (e.g., Library)"
//     value={sourceText}
//     onChange={(e) => setSourceText(e.target.value)}
//     style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//   />
//   <input
//     type="text"
//     placeholder="Destination (e.g., CSE Block)"
//     value={destinationText}
//     onChange={(e) => setDestinationText(e.target.value)}
//     style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//   />

//   {/* Travel Mode Dropdown */}
//   <select
//     value={travelMode}
//     onChange={(e) => setTravelMode(e.target.value)}
//     style={{
//       padding: "6px 10px",
//       fontSize: "14px",
//       borderRadius: "6px",
//       border: "1px solid #ccc",
//       background: "#fff",
//       cursor: "pointer"
//     }}
//   >
//     <option value="walk">🚶 Walk</option>
//     <option value="bicycle">🚴 Bicycle</option>
//     <option value="vehicle">🚗 Vehicle</option>
//   </select>

//   <button
//     onClick={handleRoute}
//     style={{
//       background: "#28a745",
//       color: "#fff",
//       border: "none",
//       padding: "6px 10px",
//       fontSize: "14px",
//       borderRadius: "6px",
//       cursor: "pointer"
//     }}
//   >
//     Route
//   </button>
//   <div className="photos-link">
//         <Link to="/photos">Photos</Link>
//       </div>
// </div>



//       {/* Map */}
//       <MapContainer

//         center={rkValley}
//         zoom={17}
//         style={{ width: "100%", height: "100%" }}
//         ref={mapRef}
//         whenCreated={(mapInstance) => {
//           mapRef.current = mapInstance;

//           const compass = new L.Control.Compass({
//             autoActive: true,
//             showDigit: true,
//           });

//           compass.addTo(mapRef.current);
//         }}


//       >

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       <LayersControl position="topright">
//   <LayersControl.BaseLayer checked name="OpenStreetMap">
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//   </LayersControl.BaseLayer>

//   <LayersControl.BaseLayer name="Satellite View">
//     <TileLayer
//       attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//       url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//     />
//   </LayersControl.BaseLayer>
// </LayersControl>

//         {sourceCoords && destinationCoords && (
//           <RoutingMachine
//             source={sourceCoords}
//             destination={destinationCoords}
//             travelMode={travelMode}
//           />
//         )}
//       </MapContainer>
//        {/* Logout */}
//        <button
//         onClick={handleLogout}
//         style={{
//           position: "absolute",
//           right: 10,
//           bottom: 25,
//           padding: "8px 12px",
//           background: "red",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           zIndex: 1000,
//         }}
//       >
//         Logout
//       </button>
//     </div>

//   );
// };

// export default MapPage;





// import React, { useEffect, useRef, useState } from "react";
// //import { Link } from 'react-router-dom';
// import { MapContainer, TileLayer, useMap, LayersControl, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-control-geocoder";
// import "leaflet-compass/dist/leaflet-compass.min.css";
// import "leaflet-compass";
// import Navbar from './Navbar'; // adjust the path if Navbar.js is in a different folder
// import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';

// const rkValley = { lat: 14.33499, lng: 78.537372 };

// const handleLogout = () => {
//   localStorage.removeItem("token"); // Or whatever key you're using
//   window.location.href = "/login"; // Adjust if using React Router
// };

// const RoutingMachine = ({ source, destination, travelMode }) => {
//   const map = useMap();
//   const mapRef = useRef(null);

//   const controlRef = useRef(null);
//   const [distance, setDistance] = useState(null);
//   const [duration, setDuration] = useState(null);

//   useEffect(() => {
//     if (!map) return;
//     if (mapRef.current) {
//       const compass = new L.Control.Compass({
//         autoActive: true,
//         showDigit: true,
//       });
//       compass.addTo(mapRef.current);
//     }
//     if (!controlRef.current) {
//       controlRef.current = L.Routing.control({
//         waypoints: [],
//         lineOptions: { styles: [{ color: "blue", weight: 4 }] },
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: true,
//         show: false,
//         createMarker: () => null,
//         routeWhileDragging: false,
//       }).addTo(map);
//     }

//     if (source && destination) {
//       controlRef.current.setWaypoints([
//         L.latLng(source.lat, source.lng),
//         L.latLng(destination.lat, destination.lng),
//       ]);

//       controlRef.current.on("routesfound", function (e) {
//         const route = e.routes[0];
//         const dist = route.summary.totalDistance;

//         let speedKmph = travelMode === "bicycle" ? 15 : travelMode === "vehicle" ? 40 : 5;
//         const timeHours = dist / 1000 / speedKmph;
//         const timeMinutes = Math.round(timeHours * 60);

//         setDistance(dist);
//         setDuration(timeMinutes);
//       });
//     }

//     return () => {
//       if (controlRef.current) {
//         controlRef.current.setWaypoints([]);
//         setDistance(null);
//         setDuration(null);
//       }
//     };
//   }, [source, destination, travelMode, map]);

//   return (
//     <>
//       {distance && duration !== null && (
//         <div
//           style={{
//             position: "absolute",
//             top: 70,
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#ffffffee",
//             padding: "10px 16px",
//             border: "2px solid #007bff",
//             borderRadius: "10px",
//             zIndex: 1000,
//             fontSize: "14px",
//             fontWeight: "500",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//           }}
//         >
//           🚩 Distance: {distance < 1000 ? `${Math.round(distance)} m` : `${(distance / 1000).toFixed(2)} km`} &nbsp; | &nbsp;
//           ⏱ Time: {duration} min
//         </div>
//       )}
//     </>
//   );
// };

// const MapPage = () => {
//   const [sourceText, setSourceText] = useState("");
//   const [destinationText, setDestinationText] = useState("");
//   const [sourceCoords, setSourceCoords] = useState(null);
//   const [destinationCoords, setDestinationCoords] = useState(null);
//   const [travelMode, setTravelMode] = useState("walk");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [position, setPosition] = useState(null);
//   const [address, setAddress] = useState('Fetching Address...')


//   const [activeInput, setActiveInput] = useState(null); // NEW: Track which input is focused


//   const geocoder = useRef(L.Control.Geocoder.nominatim());
//   const mapRef = useRef(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);


//   const customLocations = {

//     "Academic Block 1": { lat: 14.334841, lng: 78.537223, type: "Academic", hours: "9AM–10PM", description: "Centralized building with classrooms, seminar halls, and faculty offices for academic activities" },
//     "Academic Block 2": { lat: 14.335089, lng: 78.539779, type: "Academic", hours: "9AM–10PM", description: "Administrative and teaching space for various departmental operations and academic sessions" },
//     "Boys Hostel 1": { lat: 14.334589, lng: 78.536720, type: "Hostel", hours: "24x7", description: "On-campus residential block for male students with secure lodging and basic amenities" },
//     "Boys Hostel 2": { lat: 14.334773, lng: 78.540234, type: "Hostel", hours: "24x7", description: "Well-facilitated hostel for male students offering comfort, security, and communal living" },
//     "Chemical Block": { lat: 14.335304, lng: 78.542505, type: "Department", hours: "9AM–5PM", description: "Dedicated facility for chemical engineering studies, including research and lab-based learning." },
//     "Civil Block": { lat: 14.334801, lng: 78.543514, type: "Department", hours: "9AM–5PM", description: "Engineering block supporting civil engineering courses, design labs, and project spaces" },
//     "Computer Center": { lat: 14.336182, lng: 78.539610, type: "Tech", hours: "9AM–5PM", description: "Central computing facility with computer labs and high-speed internet resources." },
//     "CSE Block": { lat: 14.335914, lng: 78.541347, type: "Department", hours: "9AM–5PM", description: "Department of Computer Science and Engineering providing academic and technical infrastructure" },
//     "ECE Block": { lat: 14.334283, lng: 78.541474, type: "Department", hours: "9AM–5PM", description: "Department of Electronics and Communication Engineering offering labs and classrooms" },
//     "EEE Block": { lat: 14.336851, lng: 78.542395, type: "Department", hours: "9AM–5PM", description: "Department of Electrical and Electronics Engineering supporting circuits, machines, and power systems" },
//     "Girls Hostel 1": { lat: 14.334402, lng: 78.538412, type: "Hostel", hours: "24x7", description: "Accommodation for female students with safety and residential services." },
//     "Girls Hostel 2": { lat: 14.334361, lng: 78.538610, type: "Hostel", hours: "24x7", description: "Residential facility for girl students with necessary hostel amenities." },
//     "Guest House RKV": { lat: 14.331859, lng: 78.536652, type: "Guest facility", hours: "24x7", description: "Well-maintained guest house for hosting visiting faculty, guests, and dignitaries." },
//     "Hospital": { lat: 14.337157, lng: 78.532596, type: "Medical", hours: "24x7", description: "24x7 medical facility for basic healthcare and emergency services on campus" },
//     "IQAC": { lat: 14.336884, lng: 78.540791, type: "Administration", hours: "9AM–5PM", description: "Institutional cell responsible for maintaining and enhancing academic quality" },
//     "Lab Complex": { lat: 14.336214, lng: 78.538152, type: "Department", hours: "9AM–5PM", description: "Lab facility used by multiple departments for academic experiments and practical sessions" },
//     "Laundry": { lat: 14.333134, lng: 78.538775, type: "Laundry", hours: "9AM–5PM", description: "Laundry service center for washing and drying hostel students’ clothes." },
//     "Library": { lat: 14.335547, lng: 78.538723, type: "Academic", hours: "7AM–11PM", description: "Central resource hub with a wide collection of books, journals, and study spaces." },
//     "Masjid": { lat: 14.339404, lng: 78.535480, type: "Religious", hours: "9AM–7PM", description: "Place of worship for Muslim students and staff within the campus." },
//     "Mechanical Block": { lat: 14.336277, lng: 78.543308, type: "Department", hours: "9AM–5PM", description: "Department of Mechanical Engineering equipped for academic and technical training." },
//     "Mechanical workshop": { lat: 14.336200, lng: 78.538661, type: "Department", hours: "9AM–5PM", description: "Workshop with tools and machinery for mechanical hands-on training and fabrication" },
//     "Mess 1234": { lat: 14.333753, lng: 78.538477, type: "Food", hours: "7AM–9PM", description: "Dining hall serving meals to students with regular breakfast, lunch, and dinner" },
//     "Mess 5678": { lat: 14.333716, lng: 78.538701, type: "Food", hours: "7AM–9PM", description: "Catering facility providing nutritious food to hostel residents and students." },
//     "MME Block": { lat: 14.337335, lng: 78.541188, type: "Department", hours: "9AM–5PM", description: "Department of Metallurgical and Materials Engineering for academic and research purposes" },
//     "old campus academic blocks": { lat: 14.339002, lng: 78.537776, type: "Academic", hours: "9AM–5PM", description: "Academic buildings from the original campus supporting multiple disciplines" },
//     "old campus boys hostel rho": { lat: 14.339809, lng: 78.537592, type: "Hostel", hours: "24x7", description: "Boys’ hostel located in the older section of the campus with residential facilities." },
//     "old campus boys hostel theeta": { lat: 14.339859, lng: 78.537896, type: "Hostel", hours: "24x7", description: "Another boys’ hostel in the old campus with accommodation services." },
//     "old campus girls hostel 1": { lat: 14.338275, lng: 78.537744, type: "Hostel", hours: "24x7", description: "Girls’ hostel located in the old campus area offering safe living spaces." },
//     "old campus girls hostel 2": { lat: 14.338288, lng: 78.537914, type: "Hostel", hours: "24x7", description: "Second girls’ hostel from the old block, supporting student housing." },
//     "Police Station": { lat: 14.337844, lng: 78.536249, type: "Security", hours: "24x7", description: "Campus law enforcement unit ensuring discipline, emergency handling, and general safety." },
//     "Post Office": { lat: 14.337099, lng: 78.533741, type: "Service", hours: "9AM–4PM", description: "Postal unit on campus for sending letters, parcels, and accessing courier services." },
//     "Power House": { lat: 14.335040, lng: 78.536465, type: "Utility", hours: "9AM–5PM", description: "Electricity management center responsible for power regulation and backup systems." },
//     "RKV Ground": { lat: 14.337409, lng: 78.537874, type: "Play", hours: "6AM-8PM", description: "Multipurpose playground for sports practices, matches, and college-level tournaments." },
//     "SBI": { lat: 14.337374, lng: 78.534579, type: "Bank", hours: "9AM–5PM", description: "Banking facility providing financial services including ATM, account handling, and transactions" },
//     "Shopping Complex": { lat: 14.337353, lng: 78.534061, type: "Shopping", hours: "10AM–9PM", description: "Commercial area within campus for everyday shopping, snacks, and general items" },
//     "Sports Complex": { lat: 14.337243, lng: 78.533690, type: "Recreational", hours: "5AM–10PM", description: "Indoor and outdoor sports facilities including courts, tracks, and fitness zones." },
//     "Student Activity Center": { lat: 14.338203, lng: 78.540398, type: "Recreational", hours: "9AM–5PM", description: " Campus venue for student initiatives, cultural programs, and club activities" },
//     "Temple": { lat: 14.337074, lng: 78.533307, type: "Religious", hours: "6AM–8PM", description: " Spiritual place for religious observance and peaceful reflection." },


//   };
  
//   // Function to handle live location
//   const handleLiveLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const userLocation = [latitude, longitude]
//           setPosition([latitude, longitude]);

//           // Set the map view to the user's location with maximum zoom
//           mapRef.current?.setView(userLocation, mapRef.current.getMaxZoom());

//           // Optionally, add a marker at the user's location
//           L.marker(userLocation)
//             .addTo(mapRef.current)
//             .bindPopup("📍 You are here!")
//             .openPopup();
//         },
//         (error) => {
//           alert("Unable to retrieve your location. Please enable location services.");
//           console.error(error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   };


//   const geocodeLocation = (query) => {
//     const normalized = query.trim().toLowerCase();
//     for (const name in customLocations) {
//       if (name.toLowerCase() === normalized) {
//         return Promise.resolve(customLocations[name]);
//       }
//     }

//     return new Promise((resolve, reject) => {
//       geocoder.current.geocode(query, (results) => {
//         if (results && results.length > 0) {
//           const { center } = results[0];
//           resolve({ lat: center.lat, lng: center.lng });
//         } else {
//           reject("Location not found");
//         }
//       });
//     });
//   };


//   // Function to filter locations based on search query
//   const filterSuggestions = (query) => {
//     const lowerQuery = query.toLowerCase();
//     const filtered = Object.keys(customLocations) // Only get the names of locations
//       .filter(name => name.toLowerCase().includes(lowerQuery)) // Filter by name match
//       .map(name => ({ name })); // Map to just name for suggestions

//     setSuggestions(filtered);
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query); // Update search query
//     filterSuggestions(query); // Update suggestions based on query
//   };

//   const handleRoute = async () => {
//     try {
//       const src = await geocodeLocation(sourceText);
//       const dest = await geocodeLocation(destinationText);
//       setSourceCoords(src);
//       setDestinationCoords(dest);
//     } catch (err) {
//       alert("Failed to find one or both locations");
//       console.error(err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const handleBlockClick = (name, coords) => {
//     setDestinationText(name);
//     setDestinationCoords(coords);
//     mapRef.current?.setView([coords.lat, coords.lng], 18);

//     // Ensure map is initialized before attempting to open a popup
//     if (mapRef.current) {
//       // Show popup with block details
//       const { type, hours, description } = customLocations[name];
//       const popupContent = `
//       <div>
//          <h3>${name}</h3>
//          <p><strong>Type:</strong> ${type}</p>
//          <p><strong>Hours:</strong> ${hours}</p>
//          <p><strong>Description:</strong> ${description}</p>
//        </div>
//      `;

//       L.popup()
//         .setLatLng([coords.lat, coords.lng])
//         .setContent(popupContent)
//         .openOn(mapRef.current);
//     }
//   };

//   return (

//     <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
//       {/* Sidebar */}
//       <Navbar />
//       <div style={{
//         position: "absolute",
//         top: 70,
//         left: sidebarOpen ? 10 : -250,
//         width: "240px",
//         transition: "left 0.3s ease-in-out",
//         zIndex: 1000,
//         background: "#fff",
//         padding: "12px",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//         maxHeight: "80vh",
//         overflowY: "auto"
//       }}>
//         <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>📍 Campus Blocks</h3>
//         <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//           {Object.entries(customLocations).map(([name, data]) => (
//             <li key={name}
//               onClick={() => handleBlockClick(name, data)}
//               style={{
//                 marginBottom: "10px",
//                 padding: "8px",
//                 background: "#f1f1f1",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontSize: "14px"
//               }}>
//               <strong>{name}</strong><br />
//               <small>🧭 {data.type} | 🕒 {data.hours}</small>
//             </li>
//           ))}
//         </ul>
//       </div>
//       {/* Navbar */}
//       {/* <div style={{
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   backgroundColor: "#2c3e50",
//   color: "#ecf0f1",
//   padding: "12px 24px",
//   fontSize: "20px",
//   fontWeight: "bold",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   zIndex: 2000,
//   boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
// }}>
//    <div className="navbar-left">
//         <img src="logo.jpg" alt="Campus Logo" className="navbar-logo" />
//         <span className="navbar-title"></span>
//       </div>
//   <span style={{ whiteSpace: "nowrap" }}>Campus Navigation</span>
//   <div style={{ height: '35px',width:'40px', marginRight:0,
//         color: "#fff",
//         border: "none",
//         borderRadius: "6px",
//         padding: "8px 16px",
//         cursor: "pointer",
//         fontSize: "14px",
//         fontWeight: "bold"}}>
//   <Link to="/photos" >Photos</Link>
// </div>
//   <button
//     onClick={handleLogout}
//     style={{
//       backgroundColor: "#e74c3c",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       padding: "8px 16px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "bold"
//     }}
//   >
//     Logout
//   </button>
// </div> */}

//       {/* Toggle Sidebar */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         style={{
//           position: "absolute",
//           left: sidebarOpen ? 260 : 10,
//           top: 70,
//           zIndex: 1001,
//           background: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           padding: "6px 10px",
//           cursor: "pointer"
//         }}
//       >
//         {sidebarOpen ? "← Hide" : "→ Show"}
//       </button>

//       <button
//         onClick={handleLiveLocation}
//         style={{
//           position: "fixed",
//           right: 10,
//           bottom: 40,
//           zIndex: 1001,
//           background: "#28a745",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           padding: "6px 10px",
//           cursor: "pointer"
//         }}
//       >
//         📍 Live Location
//       </button>

//       {/* Input Bar */}
//       <div style={{
//         position: "absolute",
//         top: 10,
//         left: "50%",
//         transform: "translateX(-50%)",
//         zIndex: 1000,
//         display: "flex",
//         gap: "8px",
//         background: "#fff",
//         padding: "10px",
//         borderRadius: "8px",
//         marginTop: "70px",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
//       }}>
//         {/* <input
//     type="text"
//     placeholder="Source (e.g., Library)"
//     value={sourceText}
//     onChange={(e) => setSourceText(e.target.value)}
//     onFocus={() => filterSuggestions(sourceText)} // Ensure filtering happens on focus
   
//     style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//   />
//   <input
//     type="text"
//     placeholder="Destination (e.g., CSE Block)"
//     value={destinationText}
//     onChange={(e) => setDestinationText(e.target.value)}
//     onFocus={() => filterSuggestions(destinationText)}
//     style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//   /> */}
//         <input
//           type="text"
//           placeholder="Source (e.g., Library)"
//           value={sourceText}
//           onChange={(e) => {
//             setSourceText(e.target.value);
//             setSearchQuery(e.target.value); // Update searchQuery to show suggestions
//             filterSuggestions(e.target.value);
//           }}
//           onFocus={() => setActiveInput('source')} // SET ACTIVE INPUT
//           style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//         />

//         <input
//           type="text"
//           placeholder="Destination (e.g., CSE Block)"
//           value={destinationText}
//           onChange={(e) => {
//             setDestinationText(e.target.value);
//             setSearchQuery(e.target.value);
//             filterSuggestions(e.target.value);
//           }}
//           onFocus={() => setActiveInput('destination')} // SET ACTIVE INPUT
//           style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
//         />
//         {/* Travel Mode Dropdown */}
//         <select
//           value={travelMode}
//           onChange={(e) => setTravelMode(e.target.value)}
//           style={{
//             padding: "6px 10px",
//             fontSize: "14px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             background: "#fff",
//             cursor: "pointer"
//           }}
//         >
//           <option value="walk">🚶 Walk</option>
//           <option value="bicycle">🚴 Bicycle</option>
//           <option value="vehicle">🚗 Vehicle</option>
//         </select>

//         <button
//           onClick={handleRoute}
//           style={{
//             background: "#28a745",
//             color: "#fff",
//             border: "none",
//             padding: "6px 10px",
//             fontSize: "14px",
//             borderRadius: "6px",
//             cursor: "pointer"
//           }}
//         >
//           Route
//         </button>
//         {/* <div className="photos-link">
//          <Link to="/photos">Photos</Link>
//        </div> */}



//       </div>

//       {/* Search Suggestions */}
//       {searchQuery && suggestions.length > 0 && (
//         <ul
//           style={{
//             position: "absolute",
//             top: 60,
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#fff",
//             width: "300px",
//             maxHeight: "150px",
//             overflowY: "auto",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//             zIndex: 1000,
//             listStyle: "none",
//             padding: 0,
//             margin: 0,
//             marginTop: "70px",
//             borderRadius: "8px",
//           }}
//         >
//           {suggestions.map((suggestion, index) => {
//             return (
//               <li
//                 key={index}
//                 onClick={() => {
//                   if (activeInput === 'source') {
//                     setSourceText(suggestion.name);
//                   } else if (activeInput === 'destination') {
//                     setDestinationText(suggestion.name);
//                   }
//                   setSuggestions([]);
//                   setSearchQuery('');
//                 }}
//                 style={{
//                   padding: "8px",
//                   cursor: "pointer",
//                   backgroundColor: "#f1f1f1",
//                   borderBottom: "1px solid #ddd"
//                 }}
//               >
//                 {suggestion.name}
//               </li>

//             );
//           })}
//         </ul>
//       )}

//       {/* Map */}
//       <MapContainer

//         center={rkValley}
//         zoom={17}
//         style={{ width: "100%", height: "100%" }}
//         ref={mapRef}
//         whenCreated={(mapInstance) => {
//           mapRef.current = mapInstance;

//           const compass = new L.Control.Compass({
//             autoActive: true,
//             showDigit: true,
//           });

//           compass.addTo(mapRef.current);
//         }}


//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
//           // attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//         />
        
//         {/* Marker for Live Location */}
//         {position && (
//           <Marker position={position}>
//             <Popup>
//               <div>
//                 <p><strong>You are here!</strong></p>
//                 <p>{address}</p>
//                 <button
//                   onClick={handleLiveLocation}
//                   style={{
//                     background: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     padding: "5px 10px",
//                     borderRadius: "5px",
//                     cursor: "pointer"
//                   }}
//                 >
//                   Update Location
//                 </button>
//               </div>
//             </Popup>
//           </Marker>
//         )}

//         <LayersControl position="topright">
//           <LayersControl.BaseLayer checked name="OpenStreetMap">
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//           </LayersControl.BaseLayer>

//           <LayersControl.BaseLayer name="Satellite View">
//             <TileLayer
//               attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//               url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//             />
//           </LayersControl.BaseLayer>
//         </LayersControl>

//         {sourceCoords && destinationCoords && (
//           <RoutingMachine
//             source={sourceCoords}
//             destination={destinationCoords}
//             travelMode={travelMode}
//           />
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapPage;

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, LayersControl, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-compass/dist/leaflet-compass.min.css";
import "leaflet-compass";
import Navbar from './Navbar'; // Adjust the path if needed

const rkValley = { lat: 14.33499, lng: 78.537372 };

// Default Leaflet marker icon for consistent rendering
let DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // Ensure marker size is appropriate
  iconAnchor: [12, 41], // Anchor point for precise positioning
  popupAnchor: [1, -34], // Popup position relative to marker
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RoutingMachine = ({ source, destination, travelMode }) => {
  const map = useMap();
  const mapRef = useRef(null);

  const controlRef = useRef(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!map) return;
    if (mapRef.current) {
      const compass = new L.Control.Compass({
        autoActive: true,
        showDigit: true,
      });
      compass.addTo(mapRef.current);
    }
    if (!controlRef.current) {
      controlRef.current = L.Routing.control({
        waypoints: [],
        lineOptions: { styles: [{ color: "blue", weight: 4 }] },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
        createMarker: () => null,
        routeWhileDragging: false,
      }).addTo(map);
    }

    if (source && destination) {
      controlRef.current.setWaypoints([
        L.latLng(source.lat, source.lng),
        L.latLng(destination.lat, destination.lng),
      ]);

      controlRef.current.on("routesfound", function (e) {
        const route = e.routes[0];
        const dist = route.summary.totalDistance;

        let speedKmph = travelMode === "bicycle" ? 15 : travelMode === "vehicle" ? 40 : 5;
        const timeHours = dist / 1000 / speedKmph;
        const timeMinutes = Math.round(timeHours * 60);

        setDistance(dist);
        setDuration(timeMinutes);
      });
    }

    return () => {
      if (controlRef.current) {
        controlRef.current.setWaypoints([]);
        setDistance(null);
        setDuration(null);
      }
    };
  }, [source, destination, travelMode, map]);

  return (
    <>
      {distance && duration !== null && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffffffee",
            padding: "10px 16px",
            border: "2px solid #007bff",
            borderRadius: "10px",
            zIndex: 1000,
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          🚩 Distance: {distance < 1000 ? `${Math.round(distance)} m` : `${(distance / 1000).toFixed(2)} km`}   |  
          ⏱ Time: {duration} min
        </div>
      )}
    </>
  );
};

const MapPage = () => {
  const [sourceText, setSourceText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [travelMode, setTravelMode] = useState("walk");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("Fetching address...");
  const [activeInput, setActiveInput] = useState(null);
  const geocoder = useRef(L.Control.Geocoder.nominatim());
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const customLocations = {
    "Academic Block 1": { lat: 14.334841, lng: 78.537223, type: "Academic", hours: "9AM–10PM", description: "Centralized building with classrooms, seminar halls, and faculty offices for academic activities" },
    "Academic Block 2": { lat: 14.335089, lng: 78.539779, type: "Academic", hours: "9AM–10PM", description: "Administrative and teaching space for various departmental operations and academic sessions" },
    "Boys Hostel 1": { lat: 14.334589, lng: 78.536720, type: "Hostel", hours: "24x7", description: "On-campus residential block for male students with secure lodging and basic amenities" },
    "Boys Hostel 2": { lat: 14.334773, lng: 78.540234, type: "Hostel", hours: "24x7", description: "Well-facilitated hostel for male students offering comfort, security, and communal living" },
    "Chemical Block": { lat: 14.335304, lng: 78.542505, type: "Department", hours: "9AM–5PM", description: "Dedicated facility for chemical engineering studies, including research and lab-based learning." },
    "Civil Block": { lat: 14.334801, lng: 78.543514, type: "Department", hours: "9AM–5PM", description: "Engineering block supporting civil engineering courses, design labs, and project spaces" },
    "Computer Center": { lat: 14.336182, lng: 78.539610, type: "Tech", hours: "9AM–5PM", description: "Central computing facility with computer labs and high-speed internet resources." },
    "CSE Block": { lat: 14.335914, lng: 78.541347, type: "Department", hours: "9AM–5PM", description: "Department of Computer Science and Engineering providing academic and technical infrastructure" },
    "ECE Block": { lat: 14.334283, lng: 78.541474, type: "Department", hours: "9AM–5PM", description: "Department of Electronics and Communication Engineering offering labs and classrooms" },
    "EEE Block": { lat: 14.336851, lng: 78.542395, type: "Department", hours: "9AM–5PM", description: "Department of Electrical and Electronics Engineering supporting circuits, machines, and power systems" },
    "Girls Hostel 1": { lat: 14.334402, lng: 78.538412, type: "Hostel", hours: "24x7", description: "Accommodation for female students with safety and residential services." },
    "Girls Hostel 2": { lat: 14.334361, lng: 78.538610, type: "Hostel", hours: "24x7", description: "Residential facility for girl students with necessary hostel amenities." },
    "Guest House RKV": { lat: 14.331859, lng: 78.536652, type: "Guest facility", hours: "24x7", description: "Well-maintained guest house for hosting visiting faculty, guests, and dignitaries." },
    "Hospital": { lat: 14.337157, lng: 78.532596, type: "Medical", hours: "24x7", description: "24x7 medical facility for basic healthcare and emergency services on campus" },
    "IQAC": { lat: 14.336884, lng: 78.540791, type: "Administration", hours: "9AM–5PM", description: "Institutional cell responsible for maintaining and enhancing academic quality" },
    "Lab Complex": { lat: 14.336214, lng: 78.538152, type: "Department", hours: "9AM–5PM", description: "Lab facility used by multiple departments for academic experiments and practical sessions" },
    "Laundry": { lat: 14.333134, lng: 78.538775, type: "Laundry", hours: "9AM–5PM", description: "Laundry service center for washing and drying hostel students’ clothes." },
    "Library": { lat: 14.335547, lng: 78.538723, type: "Academic", hours: "7AM–11PM", description: "Central resource hub with a wide collection of books, journals, and study spaces." },
    "Masjid": { lat: 14.339404, lng: 78.535480, type: "Religious", hours: "9AM–7PM", description: "Place of worship for Muslim students and staff within the campus." },
    "Mechanical Block": { lat: 14.336277, lng: 78.543308, type: "Department", hours: "9AM–5PM", description: "Department of Mechanical Engineering equipped for academic and technical training." },
    "Mechanical workshop": { lat: 14.336200, lng: 78.538661, type: "Department", hours: "9AM–5PM", description: "Workshop with tools and machinery for mechanical hands-on training and fabrication" },
    "Mess 1234": { lat: 14.333753, lng: 78.538477, type: "Food", hours: "7AM–9PM", description: "Dining hall serving meals to students with regular breakfast, lunch, and dinner" },
    "Mess 5678": { lat: 14.333716, lng: 78.538701, type: "Food", hours: "7AM–9PM", description: "Catering facility providing nutritious food to hostel residents and students." },
    "MME Block": { lat: 14.337335, lng: 78.541188, type: "Department", hours: "9AM–5PM", description: "Department of Metallurgical and Materials Engineering for academic and research purposes" },
    "old campus academic blocks": { lat: 14.339002, lng: 78.537776, type: "Academic", hours: "9AM–5PM", description: "Academic buildings from the original campus supporting multiple disciplines" },
    "old campus boys hostel rho": { lat: 14.339809, lng: 78.537592, type: "Hostel", hours: "24x7", description: "Boys’ hostel located in the older section of the campus with residential facilities." },
    "old campus boys hostel theeta": { lat: 14.339859, lng: 78.537896, type: "Hostel", hours: "24x7", description: "Another boys’ hostel in the old campus with accommodation services." },
    "old campus girls hostel 1": { lat: 14.338275, lng: 78.537744, type: "Hostel", hours: "24x7", description: "Girls’ hostel located in the old campus area offering safe living spaces." },
    "old campus girls hostel 2": { lat: 14.338288, lng: 78.537914, type: "Hostel", hours: "24x7", description: "Second girls’ hostel from the old block, supporting student housing." },
    "Police Station": { lat: 14.337844, lng: 78.536249, type: "Security", hours: "24x7", description: "Campus law enforcement unit ensuring discipline, emergency handling, and general safety." },
    "Post Office": { lat: 14.337099, lng: 78.533741, type: "Service", hours: "9AM–4PM", description: "Postal unit on campus for sending letters, parcels, and accessing courier services." },
    "Power House": { lat: 14.335040, lng: 78.536465, type: "Utility", hours: "9AM–5PM", description: "Electricity management center responsible for power regulation and backup systems." },
    "RKV Ground": { lat: 14.337409, lng: 78.537874, type: "Play", hours: "6AM-8PM", description: "Multipurpose playground for sports practices, matches, and college-level tournaments." },
    "SBI": { lat: 14.337374, lng: 78.534579, type: "Bank", hours: "9AM–5PM", description: "Banking facility providing financial services including ATM, account handling, and transactions" },
    "Shopping Complex": { lat: 14.337353, lng: 78.534061, type: "Shopping", hours: "10AM–9PM", description: "Commercial area within campus for everyday shopping, snacks, and general items" },
    "Sports Complex": { lat: 14.337243, lng: 78.533690, type: "Recreational", hours: "5AM–10PM", description: "Indoor and outdoor sports facilities including courts, tracks, and fitness zones." },
    "Student Activity Center": { lat: 14.338203, lng: 78.540398, type: "Recreational", hours: "9AM–5PM", description: "Campus venue for student initiatives, cultural programs, and club activities" },
    "Temple": { lat: 14.337074, lng: 78.533307, type: "Religious", hours: "6AM–8PM", description: "Spiritual place for religious observance and peaceful reflection." },
  };

  // Fetch live location with high accuracy
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          console.log("Live location fetched:", { latitude, longitude }); // Debug log
          setPosition([latitude, longitude]);
          fetchAddress(latitude, longitude);
          mapRef.current?.setView([latitude, longitude], 18); // Center map on live location
        },
        (error) => {
          console.error("Error fetching live location:", error);
          setAddress("Unable to retrieve location. Try enabling GPS.");
          setPosition([rkValley.lat, rkValley.lng]);
          alert("Unable to retrieve your location. Please enable GPS or select a location from the sidebar.");
        },
        {
          enableHighAccuracy: true, // Prioritize GPS
          timeout: 10000, // 10-second timeout
          maximumAge: 0 // No cached position
        }
      );
    } else {
      console.error("Geolocation not supported");
      setAddress("Geolocation not supported");
      setPosition([rkValley.lat, rkValley.lng]);
      alert("Geolocation is not supported by your browser. Please select a location from the sidebar.");
    }
  }, []);

  // Reverse geocoding function
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      console.log("Reverse geocoding result:", data); // Debug log
      setAddress(data.display_name || "Address not found");
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Address not available");
    }
  };

  // Handle live location button click
  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          console.log("Live location updated:", { latitude, longitude }); // Debug log
          setPosition([latitude, longitude]);
          fetchAddress(latitude, longitude);
          mapRef.current?.setView([latitude, longitude], 18);
          L.marker([latitude, longitude])
            .addTo(mapRef.current)
            .bindPopup("📍 You are here!")
            .openPopup();
        },
        (error) => {
          console.error("Error fetching live location:", error);
          alert("Unable to retrieve your location. Please enable GPS or select a location from the sidebar.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const geocodeLocation = (query) => {
    const normalized = query.trim().toLowerCase();
    for (const name in customLocations) {
      if (name.toLowerCase() === normalized) {
        return Promise.resolve(customLocations[name]);
      }
    }

    return new Promise((resolve, reject) => {
      geocoder.current.geocode(query, (results) => {
        if (results && results.length > 0) {
          const { center } = results[0];
          resolve({ lat: center.lat, lng: center.lng });
        } else {
          reject("Location not found");
        }
      });
    });
  };

  const filterSuggestions = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = Object.keys(customLocations)
      .filter(name => name.toLowerCase().includes(lowerQuery))
      .map(name => ({ name }));
    setSuggestions(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterSuggestions(query);
  };

  const handleRoute = async () => {
    try {
      const src = await geocodeLocation(sourceText);
      const dest = await geocodeLocation(destinationText);
      setSourceCoords(src);
      setDestinationCoords(dest);
    } catch (err) {
      alert("Failed to find one or both locations");
      console.error(err);
    }
  };

  const handleBlockClick = (name, coords) => {
    setDestinationText(name);
    setDestinationCoords(coords);
    mapRef.current?.setView([coords.lat, coords.lng], 18);

    if (mapRef.current) {
      const { type, hours, description } = customLocations[name];
      const popupContent = `
        <div>
          <h3>${name}</h3>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Hours:</strong> ${hours}</p>
          <p><strong>Description:</strong> ${description}</p>
        </div>
      `;
      L.popup()
        .setLatLng([coords.lat, coords.lng])
        .setContent(popupContent)
        .openOn(mapRef.current);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <Navbar />
      {/* Sidebar */}
      <div style={{
        position: "absolute",
        top: 70,
        left: sidebarOpen ? 10 : -250,
        width: "240px",
        transition: "left 0.3s ease-in-out",
        zIndex: 1000,
        background: "#fff",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        maxHeight: "80vh",
        overflowY: "auto"
      }}>
        <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>📍 Campus Blocks</h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {Object.entries(customLocations).map(([name, data]) => (
            <li key={name}
              onClick={() => handleBlockClick(name, data)}
              style={{
                marginBottom: "10px",
                padding: "8px",
                background: "#f1f1f1",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}>
              <strong>{name}</strong><br />
              <small>🧭 {data.type} | 🕒 {data.hours}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Sidebar */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "absolute",
          left: sidebarOpen ? 260 : 10,
          top: 70,
          zIndex: 1001,
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer"
        }}
      >
        {sidebarOpen ? "← Hide" : "→ Show"}
      </button>

      {/* Live Location Button (Fixed Top-Right) */}
      <button
        onClick={handleLiveLocation}
        style={{
          position: "fixed",
          right: 10,
          bottom: 10,
          zIndex: 1001,
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        📍 Live Location
      </button>

      {/* Input Bar */}
      <div style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        display: "flex",
        gap: "8px",
        background: "#fff",
        padding: "10px",
        borderRadius: "8px",
        marginTop: "70px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
      }}>
        <input
          type="text"
          placeholder="Source (e.g., Library)"
          value={sourceText}
          onChange={(e) => {
            setSourceText(e.target.value);
            setSearchQuery(e.target.value);
            filterSuggestions(e.target.value);
          }}
          onFocus={() => setActiveInput('source')}
          style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
        />
        <input
          type="text"
          placeholder="Destination (e.g., CSE Block)"
          value={destinationText}
          onChange={(e) => {
            setDestinationText(e.target.value);
            setSearchQuery(e.target.value);
            filterSuggestions(e.target.value);
          }}
          onFocus={() => setActiveInput('destination')}
          style={{ padding: "6px 12px", fontSize: "14px", borderRadius: "6px" }}
        />
        <select
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
          style={{
            padding: "6px 10px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer"
          }}
        >
          <option value="walk">🚶 Walk</option>
          <option value="bicycle">🚴 Bicycle</option>
          <option value="vehicle">🚗 Vehicle</option>
        </select>
        <button
          onClick={handleRoute}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "6px 10px",
            fontSize: "14px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Route
        </button>
      </div>

      {/* Search Suggestions */}
      {searchQuery && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            width: "300px",
            maxHeight: "150px",
            overflowY: "auto",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            zIndex: 1000,
            listStyle: "none",
            padding: 0,
            margin: 0,
            marginTop: "70px",
            borderRadius: "8px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                if (activeInput === 'source') {
                  setSourceText(suggestion.name);
                } else if (activeInput === 'destination') {
                  setDestinationText(suggestion.name);
                }
                setSuggestions([]);
                setSearchQuery('');
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#f1f1f1",
                borderBottom: "1px solid #ddd"
              }}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}

      {/* Map */}
      <MapContainer
        center={rkValley}
        zoom={17}
        style={{ width: "100%", height: "100%" }}
        ref={mapRef}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          const compass = new L.Control.Compass({
            autoActive: true,
            showDigit: true,
          });
          compass.addTo(mapRef.current);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && (
          <Marker position={position}>
            <Popup>
              <div>
                <p><strong>You are here!</strong></p>
                <p>{address}</p>
                <button
                  onClick={handleLiveLocation}
                  style={{
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Update Location
                </button>
                <p style={{ marginTop: "10px", fontSize: "12px" }}>
                  Not at RGUKT RK Valley? Ensure GPS is enabled or select a location from the sidebar.
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution='Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {sourceCoords && destinationCoords && (
          <RoutingMachine
            source={sourceCoords}
            destination={destinationCoords}
            travelMode={travelMode}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;