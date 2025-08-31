import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import type { MapViewProps } from '../types/earthquake';
import MarkerPopup from './MarkerPopup';
import { createMarkerIcon } from '../utils/mapIcons';
import MapLegend from './MapLegend';

const MapView = ({
  earthquakesData,
  selectedEarthquake,
  onEarthquakeClick,
}: MapViewProps) => {
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const defaultPosition: [number, number] = [0, 0];

  useEffect(() => {
    if (selectedEarthquake) {
      const marker = markersRef.current[selectedEarthquake.id] as L.Marker;
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedEarthquake]);

  return (
    <div className='h-[550px] md:h-[650px] bg-[#1C1C1E] rounded-2xl shadow-lg overflow-hidden flex flex-col'>
      <div className='bg-[#327FEF] text-white p-4 rounded-t-2xl'>
        <h2 >Interactive Earthquake Map</h2>
        <p className='text-sm text-[#D1D1D1] mt-1'>
          Real-time visualization of global seismic activity
        </p>
      </div>
      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {earthquakesData.map((earthquake) => (
          <Marker
            key={earthquake.id}
            position={earthquake.coordinates}
            icon={createMarkerIcon(
              earthquake.magnitude,
              earthquake.id === selectedEarthquake?.id,
            )}
            ref={(el) => {
              if (el) markersRef.current[earthquake.id] = el;
            }}
            eventHandlers={{
              click: () => onEarthquakeClick?.(earthquake),
            }}
            zIndexOffset={earthquake.id === selectedEarthquake?.id ? 1000 : 0}>
            <MarkerPopup earthquake={earthquake} />
          </Marker>
        ))}
        <MapLegend />
      </MapContainer>
    </div>
  );
};

export default MapView;
