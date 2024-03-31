import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { fetchCities } from '../services/geocodingService';
import { useDebounce } from '../hooks/useDebounce';
import { GET_FORECAST_FROM_COORDS_QUERY  } from '../graphql/queries';
import { SuggestedCity } from './types/SuggestedCity';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { WeatherData } from './types/WeatherData';
import { DEFAULT_WIDGET_PARAMS, DEFAULT_CITY } from './../constants/index';

export const Widget: React.FC = () => {
  const locationURL = useLocation();
  const searchParams = new URLSearchParams(locationURL.search);
  const themeParam = searchParams.get('theme') || 'dark';
  const theme = createTheme({
    palette: {
      mode: themeParam === 'dark' ? 'dark' : 'light',
    },
  });

  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<SuggestedCity | null>(DEFAULT_CITY);
  const [suggestions, setSuggestions] = useState<SuggestedCity[]>([]);
  const [location, setLocation] = useState({
    latitude: DEFAULT_WIDGET_PARAMS.latitude,
    longitude: DEFAULT_WIDGET_PARAMS.longitude,
    days: DEFAULT_WIDGET_PARAMS.days
  });
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 500ms debounce

  const { loading, error, data } = useQuery(GET_FORECAST_FROM_COORDS_QUERY, {
    variables: location
  });

  useEffect(() => {
    if (debouncedSearchTerm.length >= 2) {
      fetchCities(debouncedSearchTerm)
        .then((results) => {
          setSuggestions(results || []);
        })
        .catch(console.error);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const handleSelectCity = (_event: React.ChangeEvent<object>, value: SuggestedCity | null) => {
    if (value) {
      setSelectedCity(value);
      setLocation({
        latitude: value.latitude,
        longitude: value.longitude,
        days: DEFAULT_WIDGET_PARAMS.days,
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Autocomplete
          value={selectedCity}
          onChange={handleSelectCity}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={suggestions}
          getOptionLabel={(option) => { console.log(option); return option.name + ', ' + option.country}}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField {...params} label="Search for a city" variant="outlined" fullWidth />
          )}
          style={{ marginBottom: '1rem' }}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
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
    </ThemeProvider>
  );
};
