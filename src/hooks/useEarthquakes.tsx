import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Earthquake, USGSResponse } from '../types/earthquake';

const USGS_API_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export type EarthquakesResult = {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

// USGS API returns data from the last 24h
const fetchEarthquakes = async (): Promise<USGSResponse> => {
  const res = await fetch(USGS_API_URL, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(
      'Unable to load earthquake information. Check your connection or refresh the page.',
    );
  }
  return res.json();
};

const normalizeEarthquakeData = (data: USGSResponse): Earthquake[] => {
  const earthquakes: Earthquake[] = data.features.map((feature) => ({
    id: feature.id,
    location: feature.properties.place,
    magnitude: feature.properties.mag,
    time: feature.properties.time,
    //Transforming because GeoJSON uses [longitude, latitude] and Leaflet requires [latitude, longitude]
    coordinates: [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
    ],
  }));

  // To ensure most recent earthquakes appear first
  earthquakes.sort((a, b) => b.time - a.time);
  return earthquakes;
};

// Hook loading and refreshing data every 60s
export const useEarthquakes = (): EarthquakesResult => {
  const { data, error, isPending, refetch } = useQuery<
    USGSResponse,
    Error,
    Earthquake[]
  >({
    queryKey: ['earthquakes', 'all_day'],
    queryFn: fetchEarthquakes,
    select: normalizeEarthquakeData,
    placeholderData: keepPreviousData,
    refetchInterval: 60_000,
  });

  return {
    earthquakes: data ?? [],
    loading: isPending,
    error: error ? error?.message : null,
    refetch,
  };
};
