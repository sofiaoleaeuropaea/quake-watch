import type { EarthquakeProps } from "../types/earthquake";
import { formatCoordinates, magnitudeColorClasses } from "../utils/formatEarthquakeData";
import { formatDate } from '../utils/formatData';

const EarthquakeItem = ({ earthquake }: EarthquakeProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        {formatDate(earthquake.time)}
      </td>
      <td className="p-3">{earthquake.location}</td>
      <td className="p-3">
        {formatCoordinates(earthquake.coordinates[0], earthquake.coordinates[1])}
      </td>
      <td className="p-3 font-semibold">
        <span
          className={`px-2 py-1 rounded-full text-xs ${magnitudeColorClasses(earthquake.magnitude)}`}
        >
          M {earthquake.magnitude.toFixed(1)}
        </span>
      </td>
    </tr>
  );
};

export default EarthquakeItem;