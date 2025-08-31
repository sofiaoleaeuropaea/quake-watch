import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapViewProps } from '../types/earthquake';
import { magnitudeColorClasses } from '../utils/formatEarthquakeData';
import MarkerPopup from './MarkerPopup';

const MapView = ({ earthquakes, onEarthquakeClick }: MapViewProps) => {
  const defaultPosition: [number, number] = [0, 0];

  const createMarkerIcon = (magnitude: number) =>
    L.divIcon({
      className: '',
      html: `<div class="w-6 h-6 rounded-full ${magnitudeColorClasses(
        magnitude,
      )} flex items-center justify-center text-xs font-bold">
               ${magnitude.toFixed(1)}
             </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

  return (
    <div className='h-[500px] md:h-[600px]'>
      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {earthquakes.map((earthquake) => (
          <Marker
            key={earthquake.id}
            position={earthquake.coordinates}
            icon={createMarkerIcon(earthquake.magnitude)}
            eventHandlers={{
              click: () => onEarthquakeClick?.(earthquake),
            }}>
            <MarkerPopup earthquake={earthquake} />
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
