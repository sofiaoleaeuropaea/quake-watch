import { usePagination } from '../hooks/usePagination';
import { useEarthquakes } from '../hooks/useEarthquakes';

import EarthquakeItem from './EarthquakeItem';

const ITEMS_PER_PAGE = 15;

const EarthquakeTable = () => {
  const { earthquakes, loading, error } = useEarthquakes();
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
    <div className='bg-white shadow rounded-2xl p-6 overflow-x-auto'>
      <h2 className='text-xl font-semibold mb-4'>Recent Earthquakes</h2>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr className='bg-gray-100 text-left text-gray-600 text-sm'>
            <th className='p-3'>Time</th>
            <th className='p-3'>Location</th>
            <th className='p-3'>Coordinates</th>
            <th className='p-3'>Magnitude</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((eq) => (
            <EarthquakeItem key={eq.id} earthquake={eq} />
          ))}
        </tbody>
      </table>
      <div className='flex justify-center mt-4 gap-2'>
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className='px-3 py-1 bg-gray-200 rounded disabled:opacity-50'>
          Prev
        </button>
        <span className='px-3 py-1'>
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
