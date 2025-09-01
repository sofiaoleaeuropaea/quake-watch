/**
 * Classes for table cells based on earthquake magnitude.
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
 * Background and border colors based on earthquake magnitude.
 * < 2.5 : Minor – green
 * 2.5–3.9 : Light – blue
 * 4.0–5.9 : Moderate – yellow
 * 6.0–6.9 : Strong – orange
 * >= 7.0 : Major – red
 */
export const magnitudeColorClassesIcons = (magnitude: number) => {
  if (magnitude >= 7) return { bg: '#dc2626', border: '#991b1b' }; 
  if (magnitude >= 6) return { bg: '#ea580c', border: '#c2410c' }; 
  if (magnitude >= 4) return { bg: '#ca8a04', border: '#a16207' }; 
  if (magnitude >= 2.5) return { bg: '#2563eb', border: '#1d4ed8' };
  return { bg: '#16a34a', border: '#15803d' };
};
