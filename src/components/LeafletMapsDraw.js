import React, { useEffect, useRef, useState } from "react";

//leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// import '@geoman-io/leaflet-geoman-free';
// import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const mapDefault = [-8.670458, 115.212631];
const mapZoomDefault = 13;

const LeafletMapsDraw = (props) => {
  const [mapZoom, setMapZoom] = useState(mapZoomDefault);

  const mapref = useRef(null);

  const meong = () => {
    const map = mapref.current.leafletElement;
    var fg = map.pm.getGeomanLayers(true);
  };

  useEffect(() => {
    const map = mapref.current.leafletElement;
    map.pm.addControls({
      position: "topleft",
      drawCircle: false,
      drawCircleMarker: false,
      drawRectangle: false,
    });
    map.on("pm:create", (e) => {
      meong();
    });
    map.on("pm:edit", (e) => {
      meong();
    });
    map.on("pm:dragend", (e) => {
      meong();
    });
    map.on("pm:remove", (e) => {
      meong();
    });
  }, []);

  return (
    <MapContainer
      ref={mapref}
      center={mapDefault}
      zoom={mapZoom}
      style={{ height: "300px", zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default LeafletMapsDraw;
