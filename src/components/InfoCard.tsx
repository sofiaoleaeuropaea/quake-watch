import type { IconType } from 'react-icons';

export interface InfoCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  iconSize?: number;
  iconColor?: string;
}

const InfoCard = ({ icon: Icon, label, value, iconSize = 15, iconColor }: InfoCardProps) => (
  <div className='flex items-center gap-2 p-2 bg-gray-50 rounded'>
    <div className={`w-8 h-8 flex items-center justify-center`}>
      <Icon size={iconSize} className={iconColor}/>
    </div>
    <div>
      <div className='text-gray-600 text-xs'>{label}</div>
      <div className='text-gray-800 text-sm'>{value}</div>
    </div>
  </div>
);

export default InfoCard;
