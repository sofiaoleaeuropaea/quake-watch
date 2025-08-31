export interface USGSFeature {
  id: string;
  properties: {
    place: string;
    mag: number;
    time: number;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}

export interface USGSResponse {
  type: string;
  metadata: object;
  features: USGSFeature[];
}

export interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  time: number;
  coordinates: [number, number];
}

export interface EarthquakeProps {
  earthquake: Earthquake;
}

export interface MapViewProps {
  earthquakes: Earthquake[];
  onEarthquakeClick?: (eq: Earthquake) => void;
}

export interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconColor?: string;
}

