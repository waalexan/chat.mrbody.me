import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Desabilitar ícones padrão do Leaflet (erros de ícone fantasma)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',
  iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',
  shadowUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'
});

const Mapa = ({ className }: { className: string }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao obter localização", error);
          setPosition([51.505, -0.09]);
        }
      );
    } else {
      console.log("Geolocalização não suportada");
      setPosition([51.505, -0.09]);
    }
  }, []);

  if (!position) {
    return <div className='flex justify-center items-center w-full h-full'>Carregando mapa...</div>;
  }

  return (
    <MapContainer
      className={className}
      center={position}
      zoom={19}
      // maxZoom={18}
      // minZoom={10}
      // Desabilitar zoom com rolagem e toque duplo
      // doubleClickZoom={false}
      // zoomControl={false}
      // scrollWheelZoom={false}
    >
      {/* TileLayer customizado com tema escuro e cores modificadas */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />


    {/* <TileLayer
      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      attribution='&copy; <a href="https://www.esri.com/">ESRI</a>'
    /> */}
      
      {/* Camada adicional para customizar cores da água */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
      />
      
      {/* Marker com ícone customizado (ou removido) */}
      <Marker 
        position={position}
        icon={L.divIcon({
          html: '<div style="background-color: #4CAF50; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>',
          className: 'custom-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })}
      >
        <Popup className="custom-popup">
          Este é o seu local atual!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;