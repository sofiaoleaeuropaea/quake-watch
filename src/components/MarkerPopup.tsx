import { Popup } from 'react-leaflet';
import { FaMapMarkerAlt, FaClock, FaGlobeAmericas } from 'react-icons/fa';
import type { Earthquake } from '../types/earthquake';
import { formatCoordinates, formatDate } from '../utils/formatData';
import { magnitudeColorClasses } from '../utils/magnitudeScales';
import InfoCard from './InfoCard';

export type MarkerPopupProps = { earthquake: Earthquake };

const MarkerPopup = ({ earthquake }: MarkerPopupProps) => {
  return (
    <Popup>
      <div className='min-w-[260px] text-sm space-y-3'>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${magnitudeColorClasses(
            earthquake.magnitude,
          )}`}>
          M {earthquake.magnitude.toFixed(1)}
        </span>

        <div className='grid grid-cols-1 gap-2 text-xs'>
          <InfoCard
            icon={<FaMapMarkerAlt />}
            label='Location'
            value={earthquake.location}
            iconColor='text-red-500'
          />
          <InfoCard
            icon={<FaGlobeAmericas />}
            label='Coordinates'
            value={formatCoordinates(
              earthquake.coordinates[0],
              earthquake.coordinates[1],
            )}
            iconColor='text-green-500'
          />
          <InfoCard
            icon={<FaClock />}
            label='Time'
            value={formatDate(earthquake.time)}
            iconColor='text-blue-500'
          />
        </div>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
