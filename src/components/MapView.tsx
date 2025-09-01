import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { useRef, useEffect } from 'react';
import MarkerPopup from './MarkerPopup';
import { createMarkerIcon } from '../utils/mapIcons';
import MapLegend from './MapLegend';
import type { Earthquake } from '../types/earthquake';

export type MapViewProps = {
  earthquakesData: Earthquake[];
  selectedEarthquake?: Earthquake | null;
  onEarthquakeClick?: (q: Earthquake) => void;
};

const MapView = ({
  earthquakesData,
  selectedEarthquake,
  onEarthquakeClick,
}: MapViewProps) => {
  const markersRef = useRef<Record<string, L.Marker>>({});

  const defaultPosition: [number, number] = [0, 0];

  useEffect(() => {
    if (selectedEarthquake) {
      const marker = markersRef.current[selectedEarthquake.id] as L.Marker;
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedEarthquake]);

  useEffect(() => {
    const markersId = new Set(earthquakesData.map((e) => e.id));
    for (const id of Object.keys(markersRef.current)) {
      if (!markersId.has(id)) delete markersRef.current[id];
    }
  }, [earthquakesData]);
  return (
    <div  role="region"
  aria-labelledby="map-title" className='h-[550px] md:h-[650px] bg-[#1C1C1E] rounded-2xl shadow-lg overflow-hidden flex flex-col'>
      <div className='bg-[#327FEF] p-4 rounded-t-2xl'>
        <h2 id="map-title">Interactive Earthquake Map</h2>
        <p className='mt-1'>
          Real-time visualization of global seismic activity
        </p>
      </div>

      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        keyboard={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {earthquakesData.map((eq) => (
          <Marker
            key={eq.id}
            position={eq.coordinates}
            keyboard={false}
            icon={createMarkerIcon(
              eq.magnitude,
              eq.id === selectedEarthquake?.id,
            )}
            ref={(el) => {
              if (el) markersRef.current[eq.id] = el;
            }}
            eventHandlers={{ click: () => onEarthquakeClick?.(eq) }}
            zIndexOffset={eq.id === selectedEarthquake?.id ? 1000 : 0}>
            <MarkerPopup earthquake={eq} />
          </Marker>
        ))}

        <MapLegend />
      </MapContainer>
    </div>
  );
};

export default MapView;
