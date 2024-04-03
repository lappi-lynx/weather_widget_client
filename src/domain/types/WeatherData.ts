export type HourlyWeatherData = {
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
  precipitationProbability: number;
  precipitation: number;
  temperatureUnit: string;
};

export type DailyWeatherData = {
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: string;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  windSpeed: number;
  sunshineDuration: number;
  precipitationProbability: number;
  precipitation: number;
  temperatureUnit: string;
};
