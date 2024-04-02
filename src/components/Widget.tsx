import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useCityAutocomplete } from '../hooks/useCityAutocomplete';
import { GET_FORECAST_FROM_COORDS_QUERY } from '../graphql/queries';
import { SuggestedCity } from '../domain/types/SuggestedCity';
import { useTheme, Autocomplete, TextField, CircularProgress, Grid } from "@mui/material";
import { ForecastDaysSelector } from './chart/ForecastDaysSelector';
import { WeatherChart } from './chart/WeatherChart';
import { DEFAULT_WIDGET_PARAMS } from '../infrastructure/constants';
import { renderErrorAlert } from './../utils/renderErrorAlert';

export const Widget: React.FC = () => {
  const [forecastDays, setForecastDays] = useState(DEFAULT_WIDGET_PARAMS.days);
  const [queryParams, setQueryParams] = useState({
    latitude: DEFAULT_WIDGET_PARAMS.latitude,
    longitude: DEFAULT_WIDGET_PARAMS.longitude,
    days: forecastDays
  });
  const { palette } = useTheme();

  const { loading: loadingForecast, error: errorForecast, data: forecastData } = useQuery(GET_FORECAST_FROM_COORDS_QUERY, {
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

      {forecastData && (
        <WeatherChart forecastData={forecastData.getForecastByCoordinates} palette={palette} />
      )}
    </main>
  );
};
