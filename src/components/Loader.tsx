const Loader = () => (
  <div className='absolute inset-0 z-[1000] grid place-items-center bg-black/30 backdrop-blur-sm'>
    <div
      className='rounded-xl bg-[#1C1C1E]/80 px-4 py-3'
      role='status'>
      <div
        className='grid place-items-center py-10'
        aria-hidden='true'>
        <div className='h-20 w-20 animate-spin rounded-full border-4 border-white/20 border-t-[#327FEF]' />
      </div>
      <p className='mt-2 text-center'>
        One moment! Loading earthquakes…
      </p>
    </div>
  </div>
);

export default Loader;
