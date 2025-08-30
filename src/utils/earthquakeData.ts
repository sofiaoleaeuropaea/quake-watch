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

export const magnitudeColorClasses = (magnitude: number): string => {
  if (magnitude >= 7) return 'text-red-800 bg-red-100'; // Catastrophic
  if (magnitude >= 6) return 'text-red-700 bg-red-200'; // Very strong
  if (magnitude >= 5) return 'text-orange-700 bg-orange-200'; // Strong
  if (magnitude >= 4) return 'text-yellow-700 bg-yellow-200'; // Moderate
  if (magnitude >= 3) return 'text-blue-700 bg-blue-200'; // Light
  return 'text-green-700 bg-green-200'; //Micro
};
