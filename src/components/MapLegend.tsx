import { useEffect } from 'react';
import * as L from 'leaflet';
import { useMap } from 'react-leaflet';
import { earthquakeLegend, generateLegendHTML } from '../utils/mapLegend';

const MapLegend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create(
        'div',
        'info legend p-2 rounded bg-white shadow',
      );
      div.innerHTML = generateLegendHTML(
        earthquakeLegend.labels,
        earthquakeLegend.colors,
      );
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

export default MapLegend;
