import React from 'react';
import { DailyWeatherData } from '../../domain/types/WeatherData';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Theme, Grid } from '@mui/material';
import { weatherCodeToIcon } from '../../utils/weatherIconMapping';

export const WeatherCards: React.FC<{ forecastData: DailyWeatherData[]; palette: Theme['palette'] }> = ({ forecastData, palette }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-EN', options);
  };

  const formatSunshineDuration = (seconds: number) => {
    const hours = seconds / 3600;
    return hours.toFixed(2);
  };

  return (
    <Box mt={3} sx={{ overflowX: 'auto', display: 'flex', justifyContent: 'space-around', '&::-webkit-scrollbar': { display: 'none' }}}>
      <Grid container pb={1} spacing={0} sx={{ width: 'auto', flexWrap: 'nowrap', justifyContent: 'stretch', height: 220 }}>
        {forecastData.map((forecast, index) => {
          const { Icon, color } = weatherCodeToIcon(forecast.weatherCode, palette.icon);
          return (
            <Grid item key={index} sx={{ minWidth: 160, flexShrink: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left', borderLeft: '1px solid', borderColor: palette.background.box }}>
              <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'stretch', textAlign: 'left', p: 1, backgroundColor: palette.background.box, borderRadius: 2 }}>
                <Icon size={56} color={color} />
                <Typography variant="subtitle2" sx={{ mb: 1, ml: 1 }}>
                  {formatDate(forecast.timestamp)}
                </Typography>
              </Box>
              <Box pl={2}>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {forecast.temperatureMax}°C / {forecast.temperatureMin}°C
                </Typography>
                <Typography variant="subtitle1">
                  {forecast.precipitationProbability}% rain
                </Typography>
                <Typography variant="body2">
                  <Typography variant="caption">Wind: </Typography>
                  {forecast.windSpeed} km/h
                </Typography>
                <Typography variant="body2">
                  <Typography variant="caption">Sunshine: </Typography>
                   {formatSunshineDuration(forecast.sunshineDuration)} hrs
                </Typography>
                <Typography variant="body2">
                  <Typography variant="caption">Precip: </Typography>
                  {forecast.precipitation} mm
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
