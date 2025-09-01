import { memo } from 'react';
import type { Earthquake } from '../types/earthquake';
import { formatCoordinates, formatDate } from '../utils/formatData';
import { magnitudeColorClasses } from '../utils/magnitudeScales';

export type EarthquakeItemProps = {
  earthquake: Earthquake;
  isSelected: boolean;
  onRowClick?: (earthquake: Earthquake) => void;
};

const EarthquakeItem = ({
  earthquake,
  isSelected,
  onRowClick,
}: EarthquakeItemProps) => {
  const handleClick = () => onRowClick?.(earthquake);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onRowClick?.(earthquake);
    }
  };

  return (
    <tr
      tabIndex={0}
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer hover:bg-gray-50 transition-colors duration-200
    ${
      isSelected
        ? 'bg-gray-100 border-l-4 border-[#327FEF]'
        : 'border-l-4 border-transparent'
    }`}>
      <td>{formatDate(earthquake.time)}</td>
      <td>{earthquake.location}</td>
      <td>
        {formatCoordinates(
          earthquake.coordinates[0],
          earthquake.coordinates[1],
        )}
      </td>
      <td className='p-3 font-semibold'>
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