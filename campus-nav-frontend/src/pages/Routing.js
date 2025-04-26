import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

function Routing({ from, to }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !from || !to) return;

    // Create routing control
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }]
      },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null
    }).addTo(map);

    // Cleanup with error handling
    return () => {
      if (routingControl && routingControl._container) {
        try {
          map.removeControl(routingControl);
        } catch (err) {
          console.warn("Routing cleanup failed:", err);
        }
      }
    };
  }, [map, from, to]);

  return null;
}

export default Routing;
