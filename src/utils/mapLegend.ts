export const earthquakeLegend = {
  labels: [
    'Minor: < 2.5',
    'Light: 2.5-3.9',
    'Moderate: 4-5.4',
    'Strong: 5.5-6.9',
    'Major: ≥ 7',
  ],
  colors: ['#16a34a', '#2563eb', '#ca8a04', '#ea580c', '#dc2626'],
};

export const generateLegendHTML = (labels: string[], colors: string[]) => {
  let html = '<strong>Magnitude</strong><br>';
  labels.forEach((label, i) => {
    html += `
      <i style="
        background:${colors[i]}; 
        width:12px; 
        height:12px; 
        display:inline-block; 
        margin-right:5px; 
        border-radius:50%;
      "></i>
      ${label}<br>
    `;
  });
  return html;
};