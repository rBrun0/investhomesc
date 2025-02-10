import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapComponentProps = {
  latitude: number;
  longitude: number;
};

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
  return (
    <MapContainer
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}> {/* Usando as coordenadas dinâmicas */}
        <Popup>
          Localização selecionada: {latitude}, {longitude}
        </Popup>
      </Marker>
      <MapControls latitude={latitude} longitude={longitude} /> {/* Passando coordenadas para MapControls */}
    </MapContainer>
  );
};

const MapControls = ({ latitude, longitude }: MapComponentProps) => {
  const map = useMap(); // Aqui usamos useMap dentro do MapContainer

  // Atualizando a visão do mapa com as coordenadas passadas
  map.setView([latitude, longitude], 13); // Atualizando o centro do mapa dinamicamente

  return null;
};

export default MapComponent;
