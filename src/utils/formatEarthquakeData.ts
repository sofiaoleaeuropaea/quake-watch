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

/**
 * Returns Tailwind classes for table cells based on earthquake magnitude.
 * Categories match the map color scheme for consistency:
 * 
 * < 2.5 : Minor (green)
 * 2.5–3.9 : Light (blue)
 * 4.0–5.9 : Moderate (yellow)
 * 6.0–6.9 : Strong (orange)
 * >= 7.0 : Major (red)
 */
export const magnitudeColorClasses = (magnitude: number): string => {
  if (magnitude >= 7) return 'text-red-800 bg-red-100';    
  if (magnitude >= 6) return 'text-orange-800 bg-orange-100'; 
  if (magnitude >= 4) return 'text-yellow-800 bg-yellow-100'; 
  if (magnitude >= 2.5) return 'text-blue-800 bg-blue-100';   
  return 'text-green-800 bg-green-100';                        
};

/**
 * Returns background and border colors based on earthquake magnitude.
 * Magnitude ranges are based on approximate impact/severity:
 * < 2.5 : Minor – usually not felt (green)
 * 2.5–3.9 : Light – felt slightly, minimal impact (blue)
 * 4.0–5.9 : Moderate – noticeable shaking, some damage possible (yellow)
 * 6.0–6.9 : Strong – significant damage likely (orange)
 * >= 7.0 : Major – serious or catastrophic damage (red)
 */
export const getColorClasses = (magnitude: number) => {
  if (magnitude >= 7) return { bg: '#dc2626', border: '#991b1b' }; 
  if (magnitude >= 6) return { bg: '#ea580c', border: '#c2410c' }; 
  if (magnitude >= 4) return { bg: '#ca8a04', border: '#a16207' }; 
  if (magnitude >= 2.5) return { bg: '#2563eb', border: '#1d4ed8' };
  return { bg: '#16a34a', border: '#15803d' };
};
