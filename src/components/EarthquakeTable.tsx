import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { usePagination } from '../hooks/usePagination';
import EarthquakeItem from './EarthquakeItem';
import type { Earthquake } from '../types/earthquake';

export type EarthquakeTableProps = {
  earthquakes: Earthquake[];
  selectedEarthquake?: Earthquake | null;
  onRowClick?: (q: Earthquake) => void;
};

const ITEMS_PER_PAGE = 15;

const EarthquakeTable = ({
  earthquakes,
  selectedEarthquake,
  onRowClick,
}: EarthquakeTableProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { currentItems, currentPage, totalPages, nextPage, previousPage } =
    usePagination({
      items: earthquakes,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  if (loading) {
    return (
      <div className='text-center text-gray-500 p-6'>
        Loading earthquakes...
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-500 p-6'>
        Failed to load data: {error}
      </div>
    );
  }

  return (
    <div className='bg-white shadow-lg rounded-2xl overflow-x-auto mt-10'>
      <table id='earthquake-table' className='min-w-[0px] md:min-w-full'>
        <caption className='sr-only'>
          Table of recent earthquakes. Tab to move between rows; press Enter to
          select it and open the matching map marker.
        </caption>
        <thead>
          <tr className='bg-gray-100 text-gray-700 text-left text-sm font-medium border-b border-gray-200'>
            <th scope="col" className='rounded-tl-2xl'>Time</th>
            <th scope="col">Location</th>
            <th scope="col">Coordinates</th>
            <th scope="col" className='rounded-tr-2xl'>
              <div className='relative flex items-center gap-1'>
                Magnitude
                <button
                  type='button'
                  aria-describedby='magnitude-tip'
                  aria-label='Explain magnitude scale'
                  className='text-gray-400 cursor-pointer outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#327FEF] rounded-sm'
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}>
                  <FaInfoCircle aria-hidden='true' />
                </button>
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
              onRowClick={onRowClick}
            />
          ))}
        </tbody>
      </table>
      <div className='flex justify-center mt-4 gap-2'>
        <button
          aria-label='Previous page'
          onClick={previousPage}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
          Prev
        </button>
        <span aria-live='polite' className='px-3 py-1 text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          aria-label='Next page'
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
