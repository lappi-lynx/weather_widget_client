import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDebounce } from '../hooks/useDebounce';
import { useFetchCities } from '../hooks/useFetchCities';
import { GET_FORECAST_FROM_COORDS_QUERY  } from '../graphql/queries';
import { SuggestedCity } from '../domain/types/SuggestedCity';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { WeatherData } from './../domain/types/WeatherData';
import { DEFAULT_WIDGET_PARAMS, DEFAULT_CITY } from '../infrastructure/constants';

export const Widget: React.FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<SuggestedCity | null>(DEFAULT_CITY);
  const [queryParams, setQueryParams] = useState({
    latitude: DEFAULT_WIDGET_PARAMS.latitude,
    longitude: DEFAULT_WIDGET_PARAMS.longitude,
    days: DEFAULT_WIDGET_PARAMS.days
  });
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500ms debounce

  const { loading: loadingForecast, error: errorForecast, data } = useQuery(GET_FORECAST_FROM_COORDS_QUERY, {
    variables: queryParams
  });

  const { loading: loadingCities, data: citySuggestions, error: errorCities } = useFetchCities(debouncedSearchTerm);

  const handleSelectCity = (_event: React.ChangeEvent<object>, value: SuggestedCity | null) => {
    if (value) {
      setSelectedCity(value);
      setQueryParams({
        latitude: value.latitude,
        longitude: value.longitude,
        days: DEFAULT_WIDGET_PARAMS.days,
      });
    }
  };

  if (loadingForecast) return <p>Loading forecast...</p>;
  if (errorForecast) return <p>Error: {errorForecast.message}</p>;

  return (
    <main>
      <Autocomplete
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
          <TextField {...params} label="Search for a city" variant="outlined" fullWidth />
        )}
        style={{ marginBottom: '1rem' }}
      />
      {loadingCities && <p>Loading cities...</p>}
      {errorCities && <p>Error in city loading: {errorCities.message}</p>}
      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.getForecastByCoordinates.map((forecast: WeatherData, index: number) => (
            <Card key={index} variant="outlined" sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(forecast.timestamp).toLocaleString([], { day: '2-digit', month: '2-digit', hour: '2-digit', hour12: true })}
                </Typography>
                <Typography variant="h5" component="h2">
                  {forecast.temperature} °{forecast.temperatureUnit}
                </Typography>
                <Typography color="textSecondary">
                  Humidity: {forecast.humidity}%
                </Typography>
                <Typography color="textSecondary">
                  Wind Speed: {forecast.windSpeed} km/h
                </Typography>
                <Typography color="textSecondary">
                  Cloud Cover: {forecast.cloudCover}%
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};
