import React, { useEffect, useState } from "react";

function LocationTest() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Location Test</h2>
      {location ? (
        <p>Latitude: {location.lat}, Longitude: {location.lng}</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}

export default LocationTest;
