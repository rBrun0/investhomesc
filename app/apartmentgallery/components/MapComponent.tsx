import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "@/app/assets/Map-Marker-PNG-HD.png";

type MapComponentProps = {
  latitude: number;
  longitude: number;
};

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
  const customIcon = L.icon({
    iconUrl: markerIcon.src, // Importa direto
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <MapContainer style={{ height: "500px", width: "100%" }} zoomControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        {" "}
        {/* Usando as coordenadas dinâmicas */}
        <Popup>
          Localização selecionada: {latitude}, {longitude}
        </Popup>
      </Marker>
      <MapControls latitude={latitude} longitude={longitude} />{" "}
      {/* Passando coordenadas para MapControls */}
    </MapContainer>
  );
};

const MapControls = ({ latitude, longitude }: MapComponentProps) => {
  const map = useMap();

  map.setView([latitude, longitude], 13);

  return null;
};

export default MapComponent;
