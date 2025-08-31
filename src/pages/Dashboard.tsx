import EarthquakeTable from '../components/EarthquakeTable';
import MapView from '../components/MapView';
import { useEarthquakes } from '../hooks/useEarthquakes';

const Dashboard = () => {
const { earthquakes} = useEarthquakes();

  return (
    <section>
      <MapView earthquakes={earthquakes} />
      <EarthquakeTable/>
    </section>
  );
};

export default Dashboard;
