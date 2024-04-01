import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useDebounce } from '../hooks/useDebounce';
import { useFetchCities } from '../hooks/useFetchCities';
import { GET_FORECAST_FROM_COORDS_QUERY } from '../graphql/queries';
import { SuggestedCity } from '../domain/types/SuggestedCity';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useTheme } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { ResponsiveChartContainer, LinePlot, ChartsXAxis, ChartsYAxis, ChartsLegend, ChartsGrid, ChartsReferenceLine, ChartsTooltip } from '@mui/x-charts';
import dayjs from 'dayjs';
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
  const { palette } = useTheme();

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

  const [chartData, setChartData] = useState({
    xAxisData: [],
    seriesData: [] as number[][]
  });
  useMemo(() => {
    if (data && data.getForecastByCoordinates) {
      const timestamps = data.getForecastByCoordinates.map((forecast: WeatherData) => new Date(forecast.timestamp));
      const temperatures = data.getForecastByCoordinates.map((forecast: WeatherData) => forecast.temperature);

      setChartData({
        xAxisData: timestamps,
        seriesData: [temperatures]
      });
    }
  }, [data]);

  return (
    <main style={{ backgroundColor: palette.background.default, color: palette.text.primary }}>
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
        style={{ marginBottom: '1rem', paddingTop: '1rem' }}
      />
      {(loadingCities || loadingForecast) && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <CircularProgress />
        </div>
      )}
      {errorCities && (
        <Alert severity="error" style={{ marginBottom: '1rem' }}>
          Error loading cities: {errorCities.message}
        </Alert>
      )}
      {errorForecast && (
        <Alert severity="error" style={{ marginBottom: '1rem' }}>
          Error loading forecast: {errorForecast.message}
        </Alert>
      )}
      {data && (
        <ResponsiveChartContainer
          xAxis={[{
            label: "Time",
            data: chartData.xAxisData,
            tickInterval: chartData.xAxisData,
            scaleType: 'time',
            valueFormatter: (date) => dayjs(date).format("MMM D, hA"),
          }]}
          yAxis={[{ label: "Temperature (°C)" }]}
          series={[{ type: 'line', label: selectedCity?.name || 'City', data: chartData.seriesData[0] }]}
          height={300}
        >
          <LinePlot />
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsLegend />
          <ChartsTooltip trigger="axis" />
          {/* Can not fix Grid key warnings so far */}
          <ChartsGrid horizontal={true} vertical={true} />
          <ChartsReferenceLine
            y={0}
            label="freezing point"
            labelAlign="end"
            lineStyle={{ stroke: '#333', strokeDasharray: '5 5' }}
          />
        </ResponsiveChartContainer>
      )}
    </main>
  );
};
