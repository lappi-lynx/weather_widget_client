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
import { WeatherData } from './types/WeatherData';
import { DEFAULT_WIDGET_PARAMS } from './../constants/index';

export const Widget: React.FC = () => {
  const locationURL = useLocation();
  const searchParams = new URLSearchParams(locationURL.search);
  const themeParam = searchParams.get('theme') || 'dark';
  const theme = createTheme({
    palette: {
      mode: themeParam === 'dark' ? 'dark' : 'light',
    },
  });

  const [citySearch, setCitySearch] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestedCity[]>([]);
  const [location, setLocation] = useState({
    latitude: DEFAULT_WIDGET_PARAMS.latitude,
    longitude: DEFAULT_WIDGET_PARAMS.longitude,
    days: DEFAULT_WIDGET_PARAMS.days
  });
  const debouncedSearchTerm = useDebounce(citySearch, 500); // 500ms debounce

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

  const handleSelectCity = (selectedCity: SuggestedCity) => {
    console.log("selectedCity", selectedCity);
    setLocation(prev => ({
      ...prev,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude
    }));
    setCitySearch(selectedCity.name);
    setSuggestions([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("Response data", data);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <input
          type="text"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
          placeholder="Search for a city"
        />
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} onClick={() => handleSelectCity(suggestion)}>
              {suggestion.name}, {suggestion.country}
            </div>
          ))}
        </div>
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
