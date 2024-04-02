import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ForecastDaysSelectorProps } from '../domain/types/ForecastDaysSelectorProps';

export const ForecastDaysSelector: React.FC<ForecastDaysSelectorProps> = ({ forecastDays, onChange }) => {
  const forecastPeriods = [3, 7, 14];

  return (
    <ToggleButtonGroup
      color="primary"
      value={forecastDays}
      exclusive
      onChange={onChange}
      aria-label="forecast days"
      size="small"
    >
      {forecastPeriods.map((period) => (
        <ToggleButton key={period} value={period} aria-label={`${period} days`}>
          {`${period} Days`}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
