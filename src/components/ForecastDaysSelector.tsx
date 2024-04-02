import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ForecastDaysSelectorProps } from '../domain/types/ForecastDaysSelectorProps';

export const ForecastDaysSelector: React.FC<ForecastDaysSelectorProps> = ({ forecastDays, onForecastDaysChange }) => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={forecastDays}
      exclusive
      onChange={onForecastDaysChange}
      aria-label="forecast days"
      style={{ marginBottom: '1rem' }}
    >
      <ToggleButton value={3} aria-label="3 days">3 Days</ToggleButton>
      <ToggleButton value={7} aria-label="7 days">7 Days</ToggleButton>
      <ToggleButton value={14} aria-label="14 days">14 Days</ToggleButton>
    </ToggleButtonGroup>
  );
};
