import { format } from 'date-fns';

export const formatDate = (timestamp: number): string => {
  return format(new Date(timestamp), 'MMM d, yyyy HH:mm');
};