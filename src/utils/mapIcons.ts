import * as L from 'leaflet';
import { magnitudeColorClassesIcons } from './magnitudeScales';

export const createMarkerIcon = (
  magnitude: number,
  highlighted = false,
): L.DivIcon => {
  const { bg, border } = magnitudeColorClassesIcons(magnitude);

  let size = 28;
  if (magnitude < 2.5) size = 18;
  if (magnitude >= 4 && magnitude < 5.5) size = 28;
  if (magnitude >= 5.5) size = 36;
  if (highlighted) size += 8;

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
          box-shadow:${highlighted ? '0 0 12px rgba(0,0,0,0.3)' : 'none'};
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
