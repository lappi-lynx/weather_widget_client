import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useCityAutocomplete } from '../hooks/useCityAutocomplete';
import { GET_HOURLY_FORECAST_FROM_COORDS_QUERY, GET_DAILY_FORECAST_FROM_COORDS_QUERY } from '../graphql/queries';
import { SuggestedCity } from '../domain/types/SuggestedCity';
import { useTheme, Autocomplete, TextField, CircularProgress, Grid } from "@mui/material";
import { ForecastDaysSelector } from './ForecastDaysSelector';
import { WeatherChart } from './hourly/WeatherChart';
import { DEFAULT_WIDGET_PARAMS } from '../infrastructure/constants';
import { renderErrorAlert } from './../utils/renderErrorAlert';
import { WidgetProps, ForecastModeEnum } from '../domain/types/WidgetProps';
import { WeatherCards } from './daily/WeatherCards';

export const Widget: React.FC<WidgetProps> = ({ mode }) => {
  const [forecastDays, setForecastDays] = useState(DEFAULT_WIDGET_PARAMS.days);
  const [queryParams, setQueryParams] = useState({
    latitude: DEFAULT_WIDGET_PARAMS.latitude,
    longitude: DEFAULT_WIDGET_PARAMS.longitude,
    days: forecastDays
  });
  const { palette } = useTheme();

  const forecastQuery = mode === ForecastModeEnum.DAILY ? GET_DAILY_FORECAST_FROM_COORDS_QUERY : GET_HOURLY_FORECAST_FROM_COORDS_QUERY;

  const { loading: loadingForecast, error: errorForecast, data: forecastData } = useQuery(forecastQuery, {
    variables: queryParams
  });

  const {
    inputValue,
    setInputValue,
    selectedCity,
    setSelectedCity,
    citySuggestions,
    loadingCities,
    errorCities,
  } = useCityAutocomplete();

  const handleSelectCity = (_event: React.ChangeEvent<object>, value: SuggestedCity | null) => {
    if (value) {
      setSelectedCity(value);
      setQueryParams(prev => ({
        ...prev,
        latitude: value.latitude,
        longitude: value.longitude,
      }));
    }
  }

  const handleForecastDaysChange = (_event: React.MouseEvent<HTMLElement>, value: number) => {
    setForecastDays(value);
    setQueryParams(prev => ({
      ...prev,
      days: value
    }));
  };

  return (
    <main style={{ backgroundColor: palette.background.default, color: palette.text.primary }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2} pt={2}>
        <Grid item >
          <Autocomplete
            size="small"
            onChange={handleSelectCity}
            options={citySuggestions}
            value={selectedCity}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            getOptionLabel={(option) => option.name + ', ' + option.country}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label="Search for a city" variant="outlined" />
            )}
            style={{ width: 300 }}
          />
        </Grid>
        <Grid item>
          <ForecastDaysSelector
            forecastDays={forecastDays}
            onChange={handleForecastDaysChange}
          />
        </Grid>
      </Grid>

      {(loadingCities || loadingForecast) && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <CircularProgress />
        </div>
      )}
      {errorCities && renderErrorAlert(errorCities, 'cities')}
      {errorForecast && renderErrorAlert(errorForecast, 'forecast')}

      {(forecastData && mode === ForecastModeEnum.DAILY) && (
        <WeatherCards forecastData={forecastData.getDailyForecastByCoordinates} palette={palette} />
      )}

      {(forecastData && mode === ForecastModeEnum.HOURLY) && (
        <WeatherChart forecastData={forecastData.getHourlyForecastByCoordinates} palette={palette} />
      )}
    </main>
  );
};
