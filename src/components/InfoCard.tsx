export interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconColor?: string;
}

const InfoCard = ({ icon, label, value, iconColor }: InfoCardProps) => (
  <div className='flex items-center gap-2 p-2 bg-gray-50 rounded'>
    <div className={`w-8 h-4 flex items-center justify-center ${iconColor}`}>
      {icon}
    </div>
    <div>
      <div className='text-gray-600 text-xs'>{label}</div>
      <div className='text-gray-800 text-sm'>{value}</div>
    </div>
  </div>
);

export default InfoCard;
