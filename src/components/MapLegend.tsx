import LeafletControl from './LeafletControl';

const earthquakeLegends = [
  { label: 'Minor: < 2.5', color: '#16a34a' },
  { label: 'Light: 2.5–3.9', color: '#2563eb' },
  { label: 'Moderate: 4–5.4', color: '#ca8a04' },
  { label: 'Strong: 5.5–6.9', color: '#ea580c' },
  { label: 'Major: ≥ 7', color: '#dc2626' },
];

const MapLegend = () => {
  return (
    <LeafletControl
      position='bottomright'
      className='p-2 rounded bg-white shadow'>
      <div role='group' aria-label='Magnitude legend'>
        <strong className='block mb-1'>Magnitude</strong>
        <ul className='space-y-1'>
          {earthquakeLegends.map((legend) => (
            <li key={legend.label} className='flex items-center gap-2'>
              <span
                aria-hidden='true'
                className='inline-block rounded-full'
                style={{ width: 12, height: 12, background: legend.color }}
              />
              <span>{legend.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </LeafletControl>
  );
};

export default MapLegend;
