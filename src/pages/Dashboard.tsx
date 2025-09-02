import { useEffect, useMemo, useState } from 'react';
import EarthquakeTable from '../components/EarthquakeTable';
import MapView from '../components/MapView';
import { useEarthquakes } from '../hooks/useEarthquakes';
import type { Earthquake } from '../types/earthquake';
import SearchBar from '../components/SearchBar';
import ErrorBanner from '../components/ErrorBanner';
import Loader from '../components/Loader';
import { type PromptFilters } from '../lib/gemini';
import { applyPromptFilters } from '../utils/promptFilters';
import { usePromptFilters } from '../hooks/usePromptFilters';
const Dashboard = () => {
  const { earthquakes, loading, error, refetch } = useEarthquakes();
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<Earthquake | null>(null);
  const [lastFilters, setLastFilters] = useState<PromptFilters | null>(null);

  const { mutateAsync: parsePrompt, error: parseError } = usePromptFilters();

  const displayedEarthquakes = useMemo(
    () =>
      lastFilters ? applyPromptFilters(earthquakes, lastFilters) : earthquakes,
    [earthquakes, lastFilters],
  );

  // to ensure that is displayed the correct info when map/list updates automatically
  useEffect(() => {
    setSelectedEarthquake((prev) =>
      prev && displayedEarthquakes.some((eq) => eq.id === prev.id)
        ? prev
        : null,
    );
  }, [displayedEarthquakes]);

  const handlePrompt = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setLastFilters(null);
      setSelectedEarthquake(null);
      return;
    }
    const filters = await parsePrompt(trimmed);
    setLastFilters(filters); 
  };

  return (
    <section>
      <div className='min-h-screen m-4 md:m-10 lg:m-20'>
        <SearchBar onApply={handlePrompt} errorMsg={parseError?.message} />
        {error && <ErrorBanner message={error} onRetry={refetch} />}
        <div className='relative' aria-busy={loading}>
          <MapView
            earthquakesData={displayedEarthquakes}
            selectedEarthquake={selectedEarthquake}
            onEarthquakeClick={setSelectedEarthquake}
          />
          <EarthquakeTable
            earthquakes={displayedEarthquakes}
            selectedEarthquake={selectedEarthquake}
            onRowClick={setSelectedEarthquake}
          />
          {loading && <Loader />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
