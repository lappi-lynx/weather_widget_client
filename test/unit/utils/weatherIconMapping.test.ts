import { WiDaySunny, WiDayCloudy, WiCloud, WiFog, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { weatherCodeToIcon } from './../../../src/utils/weatherIconMapping';

describe('weatherCodeToIcon', () => {
  const colorPalette = {
    sun: '#ffa000',
    rain: '#0277bd',
    cloud: '#9e9e9e',
    snow: '#e0e0e0',
  };

  it('returns the correct icon and color for clear skies', () => {
    const weatherIcon = weatherCodeToIcon(0, colorPalette);
    expect(weatherIcon.Icon).toBe(WiDaySunny);
    expect(weatherIcon.color).toBe(colorPalette.sun);
  });

  it('returns the correct icon and color for cloudy weather', () => {
    const weatherIcon = weatherCodeToIcon(3, colorPalette);
    expect(weatherIcon.Icon).toBe(WiDayCloudy);
    expect(weatherIcon.color).toBe(colorPalette.sun);
  });

  it('returns the correct icon and color for fog', () => {
    const weatherIcon = weatherCodeToIcon(45, colorPalette);
    expect(weatherIcon.Icon).toBe(WiFog);
    expect(weatherIcon.color).toBe(colorPalette.cloud);
  });

  it('returns the correct icon and color for rain', () => {
    const weatherIcon = weatherCodeToIcon(61, colorPalette);
    expect(weatherIcon.Icon).toBe(WiRain);
    expect(weatherIcon.color).toBe(colorPalette.rain);
  });

  it('returns the correct icon and color for snow', () => {
    const weatherIcon = weatherCodeToIcon(71, colorPalette);
    expect(weatherIcon.Icon).toBe(WiSnow);
    expect(weatherIcon.color).toBe(colorPalette.snow);
  });

  it('returns the correct icon and color for thunderstorm', () => {
    const weatherIcon = weatherCodeToIcon(95, colorPalette);
    expect(weatherIcon.Icon).toBe(WiThunderstorm);
    expect(weatherIcon.color).toBe(colorPalette.rain);
  });

  it('returns the default icon and color when code is unknown', () => {
    const weatherIcon = weatherCodeToIcon(999, colorPalette);
    expect(weatherIcon.Icon).toBe(WiCloud);
    expect(weatherIcon.color).toBe(colorPalette.cloud);
  });
});
