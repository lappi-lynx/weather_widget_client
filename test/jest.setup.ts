import 'jest';

jest.mock('./../src/infrastructure/constants', () => ({
  DEFAULT_WIDGET_PARAMS: {
    latitude: 60.16952,
    longitude: 24.93545,
    days: 3,
    theme: 'dark'
  },
  GEODOING_API_URL: 'https://geocoding-api.open-meteo.com/v1',
  GRAPHQL_API_URL: 'http://localhost:4445/graphql',
  DEFAULT_CITY: {
    id: 658225,
    name: 'Helsingfors',
    latitude: 60.16952,
    longitude: 24.93545,
    country: 'Finland',
    country_id: 660013
  }
}));
