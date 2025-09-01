import { useState, useEffect } from 'react';
import type { Earthquake, USGSResponse } from '../types/earthquake';

const USGS_API_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export const useEarthquakes = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(USGS_API_URL);
      if (!res.ok) {
        throw new Error(
          `Unable to load earthquake information. Check your internet connection or try refreshing the page.`,
        );
      }

      const earthquakeData: USGSResponse = await res.json();

      const transformed: Earthquake[] = earthquakeData.features.map(
        (feature) => ({
          id: feature.id,
          location: feature.properties.place,
          magnitude: feature.properties.mag,
          time: feature.properties.time,
          //GeoJSON uses [longitude, latitude], Leaflet requires [latitude, longitude]
          coordinates: [
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ],
        }),
      );

      // Sort earthquakes by most recent first
      transformed.sort((a, b) => b.time - a.time);
      setEarthquakes(transformed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch earthquake data.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  return { earthquakes, loading, error, refetch: fetchEarthquakes };
};
