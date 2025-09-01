import { useState } from 'react';
import EarthquakeTable from '../components/EarthquakeTable';
import MapView from '../components/MapView';
import { useEarthquakes } from '../hooks/useEarthquakes';
import type { Earthquake } from '../types/earthquake';
import SearchBar from '../components/SearchBar';
import ErrorBanner from '../components/ErrorBanner';
import Loader from '../components/Loader';
const Dashboard = () => {
  const { earthquakes, loading, error, refetch } = useEarthquakes();
  const [selectedEarthquake, setSelectedEarthquake] =
    useState<Earthquake | null>(null);
  const displayLoading = loading;
  return (
    <section>
      <div className='min-h-screen m-4 md:m-10 lg:m-20'>
        <SearchBar />
        {error && <ErrorBanner message={error} onRetry={refetch} />}
        <div className='relative' aria-busy={displayLoading}>
          <MapView
            earthquakesData={earthquakes}
            selectedEarthquake={selectedEarthquake}
            onEarthquakeClick={setSelectedEarthquake}
          />
          <EarthquakeTable
            earthquakes={earthquakes}
            selectedEarthquake={selectedEarthquake}
            onRowClick={setSelectedEarthquake}
          />
          {displayLoading && <Loader />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
