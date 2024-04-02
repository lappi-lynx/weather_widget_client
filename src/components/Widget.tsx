import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useCityAutocomplete } from '../hooks/useCityAutocomplete';
import { GET_FORECAST_FROM_COORDS_QUERY } from '../graphql/queries';
import { SuggestedCity } from '../domain/types/SuggestedCity';
import { useTheme, Autocomplete, TextField, CircularProgress, Grid } from "@mui/material";
import { ResponsiveChartContainer, LinePlot, ChartsXAxis, ChartsYAxis, ChartsLegend, ChartsGrid, ChartsReferenceLine, ChartsTooltip, BarPlot } from '@mui/x-charts';
import dayjs from 'dayjs';
import { WeatherData } from './../domain/types/WeatherData';
import { ForecastDaysSelector } from './ForecastDaysSelector';
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

  type ChartData = {
    xAxisData: Date[];
    seriesData: number[][];
    seriesLabels?: string[];
  };

  const [chartData, setChartData] = useState<ChartData>({
    xAxisData: [],
    seriesData: [],
  });

  useEffect(() => {
    if (forecastData && forecastData.getForecastByCoordinates) {
      const chartData = forecastData.getForecastByCoordinates.reduce((data: ChartData, forecast: WeatherData) => {
        data.xAxisData.push(new Date(forecast.timestamp));
        data.seriesData[0].push(forecast.temperature);
        data.seriesData[1].push(forecast.precipitation);
        data.seriesData[2].push(forecast.cloudCover);
        data.seriesData[3].push(forecast.windSpeed);
        return data;
      }, {
        xAxisData: [],
        seriesData: [[], [], [], []],
        seriesLabels: ['Temperature, C', 'Precipitation, mm', 'Cloud Cover', 'Wind Speed, km/h'],
      });

      setChartData(chartData);
    }
  }, [forecastData]);

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

      {forecastData && chartData.seriesLabels && (
        <ResponsiveChartContainer
          xAxis={[{
            id: 'bottomAxis',
            label: "Timeline",
            data: chartData.xAxisData,
            scaleType: 'band',
            valueFormatter: (date) => dayjs(date).format("MMM D, hA"),
          },
          {
            id: 'topAxis',
            label: "Cloud Cover %",
            data: chartData.seriesData[2],
            scaleType: 'point'
          }]}
          yAxis={[
            { id: 'leftAxis', label: "Temperature, °C", scaleType: 'linear' },
            {
              id: 'rightAxis',
              label: "Wind speed, km/h",
              data: chartData.seriesData[3],
              scaleType: 'linear',
            }
          ]}
          series={[
            { type: 'line', label: chartData.seriesLabels![0], data: chartData.seriesData[0], color: palette.chart.tempterature },
            { type: 'bar', label: chartData.seriesLabels![1], data: chartData.seriesData[1], color: palette.chart.precipitation },
            { type: 'band', label: chartData.seriesLabels![2], data: chartData.seriesData[2], xAxisKey: 'topAxis' },
            { type: 'line', label: chartData.seriesLabels![3], data: chartData.seriesData[3], yAxisKey: 'rightAxis', color: palette.chart.wind },
          ]}
          height={400}
          margin={{ top: 120 }}
          sx={{
            "& .MuiChartsAxis-left .MuiChartsAxis-label": {
              strokeWidth: "0.4",
              fill: `${palette.chart.tempterature}`,
            },
            "& .MuiChartsAxis-left line": {
              stroke: `${palette.chart.tempterature}`,
            },
            "& .MuiChartsAxis-left text": {
              stroke: `${palette.chart.tempterature}`,
            },
            // right Axis styles
            "& .MuiChartsAxis-right .MuiChartsAxis-label": {
              strokeWidth: "0.4",
              fill: `${palette.chart.wind}`,
            },
            "& .MuiChartsAxis-right line": {
              stroke: `${palette.chart.wind}`,
            },
            "& .MuiChartsAxis-right text": {
              stroke: `${palette.chart.wind}`,
            },
            // top Axis styles
            "& .MuiChartsAxis-top .MuiChartsAxis-label": {
              strokeWidth: "0.4",
              fill: `${palette.chart.clouds}`,
            },
            "& .MuiChartsAxis-top line": {
              stroke: `${palette.chart.clounds}`,
            },
            "& .MuiChartsAxis-top text": {
              stroke: `${palette.chart.clouds}`,
              strokeWidth: "0.6",
            },
          }}
        >
          <LinePlot />
          <ChartsYAxis axisId='rightAxis' position='right' />
          <ChartsXAxis axisId='bottomAxis' position='bottom' />
          <ChartsXAxis axisId='topAxis' position='top' />
          <ChartsYAxis axisId='leftAxis' position='left' />
          <ChartsLegend />
          <BarPlot />
          <ChartsTooltip />
          <ChartsGrid horizontal={true} vertical={true} />
          <ChartsReferenceLine
            y={0}
            labelAlign="end"
            lineStyle={{ stroke: palette.text.primary, strokeDasharray: '5 5' }}
          />
        </ResponsiveChartContainer>
      )}
    </main>
  );
};
