import { validateCityParam } from '../../../src/utils/validateCity';

describe('validateCityParam', () => {
  it('should throw an error if city is null', () => {
    expect(() => {
      validateCityParam(null);
    }).toThrow('City name cannot be empty.');
  });

  it('should throw an error if city is undefined', () => {
    expect(() => {
      validateCityParam(undefined);
    }).toThrow('City name cannot be empty.');
  });

  it('should throw an error if city is an empty string', () => {
    expect(() => {
      validateCityParam(' ');
    }).toThrow('City name cannot be empty.');
  });

  it('should throw an error if city contains invalid characters', () => {
    expect(() => {
      validateCityParam('City@Name');
    }).toThrow('Invalid city name provided.');
  });

  it('should return the city name if it is valid', () => {
    const cityName = 'New York';
    expect(validateCityParam(cityName)).toBe(cityName);
  });

  it('should trim the city name if it contains leading or trailing whitespace', () => {
    const cityName = '  Los Angeles  ';
    expect(validateCityParam(cityName)).toBe('Los Angeles');
  });
});
