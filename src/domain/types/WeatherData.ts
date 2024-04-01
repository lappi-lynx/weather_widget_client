export type WeatherData = {
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  sunshineDuration: number;
  temperatureUnit: string;
};