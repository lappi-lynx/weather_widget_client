import dayjs from 'dayjs';

export const formatDateForChart = (date: Date | string): string => {
  return dayjs(date).format("MMM D, hA");
};
