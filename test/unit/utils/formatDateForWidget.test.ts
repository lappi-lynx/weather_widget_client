import { formatDateForChart } from './../../../src/utils/formatDateForWidget';
import dayjs from 'dayjs';

describe('formatDateForChart', () => {
  it('should format a Date object correctly', () => {
    const date = new Date('2021-04-03T14:00:00Z');
    const formattedDate = formatDateForChart(date);
    const expectedDate = dayjs(date).format("MMM D, hA");
    expect(formattedDate).toBe(expectedDate);
  });

  it('should format a date string correctly', () => {
    const dateString = '2021-04-03T14:00:00Z';
    const formattedDate = formatDateForChart(dateString);
    const expectedDate = dayjs(dateString).format("MMM D, hA");
    expect(formattedDate).toBe(expectedDate);
  });
});
