import type { EarthquakeProps } from '../types/earthquake';
import {
  formatCoordinates,
  magnitudeColorClasses,
} from '../utils/formatEarthquakeData';
import { formatDate } from '../utils/formatData';

const EarthquakeItem = ({
  earthquake,
  isSelected,
  onClick,
}: EarthquakeProps & { isSelected: boolean; onClick?: () => void }) => {
  return (
    <tr
      onClick={onClick}
      className={`cursor-pointer hover:bg-gray-50 transition-colors duration-200
    ${
      isSelected
        ? 'bg-gray-100 border-l-4 border-[#327FEF]'
        : 'border-l-4 border-transparent'
    }`}>
      <td >{formatDate(earthquake.time)}</td>
      <td >{earthquake.location}</td>
      <td >
        {formatCoordinates(
          earthquake.coordinates[0],
          earthquake.coordinates[1],
        )}
      </td>
      <td className='font-semibold'>
        <span
          className={`px-2 py-1 rounded-full text-xs ${magnitudeColorClasses(
            earthquake.magnitude,
          )}`}>
          M {earthquake.magnitude.toFixed(1)}
        </span>
      </td>
    </tr>
  );
};

export default EarthquakeItem;
