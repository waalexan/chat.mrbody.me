import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, onValue } from "firebase/database";
import { database } from '@/config/firebase';
import { toast } from 'sonner';

// Fix for default Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',
  iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',
  shadowUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'
});

interface ReportProps {
  id: string;
  id_user: string | null;
  user_name: string | null;
  user_photo: string | null;
  user_email: string | null;
  user_phone: string | null;
  title: string | null;
  description: string | null;
  address: string | null;
  photo: string | null;
  lat: number | null;
  lon: number | null;
  created_at: Date;
}

const Mapa = ({ className }: { className: string }) => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reportsRef = ref(database, 'reports/');
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      const reportsList = data
        ? Object.entries(data).map(([id, report]: [string, any]) => ({
            id,
            ...report,
            created_at: new Date(report.created_at)
          }))
        : [];
      setReports(reportsList);

      toast("Reports updated", {
        description: new Date().toLocaleString(),
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          // Default to London coordinates if geolocation fails
          setPosition([51.505, -0.09]);
          setLoading(false);
        }
      );
    } else {
      console.log("Geolocation not supported");
      setPosition([51.505, -0.09]);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className='flex justify-center items-center w-full h-full'>Loading map...</div>;
  }

  return (
    <MapContainer
      className={className}
      center={position}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
      />

      {/* Current location marker */}
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
          Your current location
        </Popup>
      </Marker>

      {/* Report markers */}
      {reports
        .filter(report => report.lat && report.lon)
        .map((report) => (
          <React.Fragment key={report.id}>
            <Marker position={[report.lat!, report.lon!]}>
              <Popup>
                <div className="max-w-xs">
                  <strong className="text-lg">{report.title}</strong>
                  <p className="text-sm mt-1">{report.description}</p>
                  {report.photo && (
                    <img 
                      src={report.photo} 
                      alt="Report" 
                      className="mt-2 rounded" 
                      style={{ maxWidth: '100%' }}
                    />
                  )}
                  {report.address && (
                    <p className="text-xs mt-1 text-gray-500">{report.address}</p>
                  )}
                </div>
              </Popup>
            </Marker>
            
            <CircleMarker
              center={[report.lat!, report.lon!]}
              radius={50}
              pathOptions={{
                fillColor: '#FF6347',
                color: '#FF0000',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.5
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <strong className="text-lg">{report.title}</strong>
                  <p className="text-sm mt-1">{report.description}</p>
                </div>
              </Popup>
            </CircleMarker>
          </React.Fragment>
        ))}
    </MapContainer>
  );
};

export default Mapa;