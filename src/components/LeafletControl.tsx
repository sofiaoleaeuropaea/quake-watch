import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import * as L from 'leaflet';
import { useMap } from 'react-leaflet';

type Props = {
  position?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
  className?: string;
  children: React.ReactNode;
};

export default function LeafletControl({
  position = 'bottomright',
  className,
  children,
}: Props) {
  const map = useMap();
  const container = useMemo(() => {
    const div = L.DomUtil.create('div', className ?? '');
    return div;
  }, [className]);

  useEffect(() => {
    const control = new L.Control({ position });
    control.onAdd = () => container;
    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, container, position]);

  return createPortal(children, container);
}
