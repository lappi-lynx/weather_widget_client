import { gql } from '@apollo/client';

export const GET_HOURLY_FORECAST_FROM_COORDS_QUERY = gql`
  query HourlyWeatherData($latitude: Float!, $longitude: Float!, $days: Int) {
    getHourlyForecastByCoordinates(latitude: $latitude, longitude: $longitude, days: $days) {
      location {
        latitude
        longitude
      }
      timestamp
      temperature
      windSpeed
      cloudCover
      precipitation
      temperatureUnit
      # humidity
      # sunshineDuration
      # precipitationProbability
    }
  }
`;

export const GET_DAILY_FORECAST_FROM_COORDS_QUERY = gql`
  query DailyWeatherData($latitude: Float!, $longitude: Float!, $days: Int) {
    getDailyForecastByCoordinates(latitude: $latitude, longitude: $longitude, days: $days) {
      location {
        latitude
        longitude
      }
      timestamp
        temperatureMax
        temperatureMin
        weatherCode
        windSpeed
        sunshineDuration
        precipitationProbability
        precipitation
        temperatureUnit
    }
  }
`;
