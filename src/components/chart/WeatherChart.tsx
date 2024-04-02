import React, { useState, useEffect } from 'react';
import { ResponsiveChartContainer, LinePlot, ChartsXAxis, ChartsYAxis, ChartsLegend, ChartsGrid, ChartsReferenceLine, ChartsTooltip, BarPlot } from '@mui/x-charts';
import { WeatherData } from './../../domain/types/WeatherData';
import { Theme } from '@mui/material';
import { formatDateForChart } from './../../utils/formatDateForWidget';
import { ChartData } from './../../domain/types/ChartData';

export const WeatherChart: React.FC<{ forecastData: WeatherData[]; palette: Theme['palette'] }> = ({ forecastData, palette }) => {
  const [chartData, setChartData] = useState<ChartData>({
    xAxisData: [],
    seriesData: [],
  });

  useEffect(() => {
    if (forecastData) {
      const chartData = forecastData.reduce((data: ChartData, forecast: WeatherData) => {
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
    <>
      {(chartData && chartData.seriesLabels) && (
        <ResponsiveChartContainer
        xAxis={[{
          id: 'bottomAxis',
          label: "Timeline",
          data: chartData.xAxisData,
          scaleType: 'band',
          valueFormatter: formatDateForChart,
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
    </>
  );
};
