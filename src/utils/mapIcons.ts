import { getColorClasses } from './formatEarthquakeData';
import * as L from 'leaflet';
export const createMarkerIcon = (magnitude: number, highlighted = false) => {
  const { bg, border } = getColorClasses(magnitude);

  // Adjust size according to magnitude
  let size = 28;
  if (magnitude < 2.5) size = 18;
  if (magnitude >= 4 && magnitude < 5.5) size = 28;
  if (magnitude >= 5.5) size = 36; 

  if (highlighted) size += 8;

  const shadow = highlighted ? '0 0 12px rgba(0,0,0,0.3)' : 'none';

  return L.divIcon({
    className: '',
    html: `
      <div
        class="flex items-center justify-center rounded-full text-xs font-bold"
        style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${bg};
          border: 2px solid ${border};
          box-shadow: ${shadow};
          color: white;
        "
      >
        ${magnitude.toFixed(1)}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};
