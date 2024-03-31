import { SuggestedCity } from './../components/types/SuggestedCity';

export const DEFAULT_WIDGET_PARAMS = {
  latitude: 60.16952,
  longitude: 24.93545,
  days: 1,
  theme: 'dark'
};

export const GEODOING_API_URL = import.meta.env.APP_GEODOING_API_URL || 'https://geocoding-api.open-meteo.com/v1'
export const GRAPHQL_API_URL  = import.meta.env.APP_GRAPHQL_API_URL || 'http://localhost:4445/graphql'

export const DEFAULT_CITY: SuggestedCity = {
  id: 658225,
  name: "Helsingfors",
  latitude: 60.16952,
  longitude: 24.93545,
  country: "Finland"
};
