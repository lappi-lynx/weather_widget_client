import { gql } from '@apollo/client';

export const GET_FORECAST_FROM_COORDS_QUERY = gql`
  query GetWeather($latitude: Float!, $longitude: Float!, $days: Int) {
    getForecastByCoordinates(latitude: $latitude, longitude: $longitude, days: $days) {
      location {
        latitude
        longitude
      }
      timestamp
      temperature
      humidity
      windSpeed
      cloudCover
      sunshineDuration
      temperatureUnit
    }
  }
`;
