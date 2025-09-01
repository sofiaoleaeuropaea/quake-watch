import { format } from 'date-fns';

export const formatDate = (timestamp: number): string => {
  return format(new Date(timestamp), 'MMM d, yyyy HH:mm');
};

export const formatCoordinates = (
  latitude: number,
  longitude: number,
): string => {
  const latitudeDir = latitude >= 0 ? 'N' : 'S';
  const longitudeDir = longitude >= 0 ? 'E' : 'W';

  return `${Math.abs(latitude).toFixed(4)}°${latitudeDir}, ${Math.abs(
    longitude,
  ).toFixed(4)}°${longitudeDir}`;
};
