export type ForecastDaysSelectorProps = {
  forecastDays: number;
  onForecastDaysChange: (_event: React.MouseEvent<HTMLElement>, value: number) => void;
}
