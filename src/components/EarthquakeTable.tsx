import { useState } from 'react';
import { usePagination } from '../hooks/usePagination';
import { useEarthquakes } from '../hooks/useEarthquakes';

import EarthquakeItem from './EarthquakeItem';
import type { EarthquakeTableProps } from '../types/earthquake';
import { FaInfoCircle } from 'react-icons/fa';

const ITEMS_PER_PAGE = 15;

const EarthquakeTable = ({
  selectedEarthquake,
  onRowClick,
}: EarthquakeTableProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { earthquakes } = useEarthquakes();
  const { currentItems, currentPage, totalPages, nextPage, previousPage } =
    usePagination({
      items: earthquakes,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  return (
    <div className='bg-white shadow-lg rounded-2xl overflow-x-auto mt-10'>
      <table className='min-w-[0px] md:min-w-full'>
        <thead>
          <tr className='bg-gray-100 text-gray-700 text-left text-sm font-medium border-b border-gray-200'>
            <th className='rounded-tl-2xl'>Time</th>
            <th>Location</th>
            <th>Coordinates</th>
            <th className='rounded-tr-2xl'>
              <div className='relative flex items-center gap-1'>
                Magnitude
                <FaInfoCircle
                  className='text-gray-400 cursor-pointer'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                  <div className='absolute top-6 left-0 w-48 p-2 text-xs bg-gray-50 text-gray-800 rounded shadow-lg z-50'>
                    Earthquake magnitudes are measured on the Richter scale.
                  </div>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((eq) => (
            <EarthquakeItem
              key={eq.id}
              earthquake={eq}
              isSelected={selectedEarthquake?.id === eq.id}
              onClick={() => onRowClick?.(eq)}
            />
          ))}
        </tbody>
      </table>
      <div className='flex justify-center items-center gap-2 p-4 bg-gray-50 border-t border-gray-200'>
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
          Prev
        </button>
        <span className='px-3 py-1 text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
          Next
        </button>
      </div>
    </div>
  );
};

export default EarthquakeTable;
