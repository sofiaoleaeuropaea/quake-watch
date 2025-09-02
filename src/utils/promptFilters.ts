import type { Earthquake } from '../types/earthquake';
import type { PromptFilters } from '../lib/gemini';

export const applyPromptFilters = (
  earthquakes: Earthquake[],
  filters: PromptFilters
): Earthquake[] => {

  const minMagnitude = typeof filters.minMagnitude === 'number' ? filters.minMagnitude : null;
  const cutoffTime =
    typeof filters.hours === 'number' ? Date.now() - filters.hours * 3_600_000 : null;
  const region = filters.regionText?.trim().toLowerCase() || null;

  const filteredQuakes = earthquakes.filter((earthquake) => {
    if (minMagnitude !== null && (earthquake.magnitude ?? -Infinity) < minMagnitude) return false;
    if (cutoffTime !== null && earthquake.time < cutoffTime) return false;
    if (region && !earthquake.location?.toLowerCase().includes(region)) return false;
    return true;
  });

  return filteredQuakes;
}

