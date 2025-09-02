import type { Earthquake } from '../types/earthquake';
import type { PromptFilters } from '../lib/gemini';

export const applyPromptFilters = (
  earthquakes: Earthquake[],
  filters: PromptFilters
): Earthquake[] => {
  const cutoffTime =
    typeof filters.hours === 'number'
      ? Date.now() - filters.hours * 3_600_000
      : null;
  const region = filters.regionText?.trim().toLowerCase() || null;

  return earthquakes.filter((quake) => {
    const mag = quake.magnitude ?? -Infinity;

    if (filters.magnitudeBt != null && !(mag > filters.magnitudeBt)) return false;
    if (filters.magnitudeBte != null && !(mag >= filters.magnitudeBte)) return false;
    if (filters.magnitudeLt != null && !(mag < filters.magnitudeLt)) return false;
    if (filters.magnitudeLte != null && !(mag <= filters.magnitudeLte)) return false;

    if (cutoffTime !== null && quake.time < cutoffTime) return false;

    if (region && !quake.location?.toLowerCase().includes(region)) return false;

    return true;
  });
};
