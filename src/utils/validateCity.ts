export const validateCityParam = (city: string | null | undefined): string => {
  if (city === undefined || city === null || city.trim() === '') {
    throw new Error('City name cannot be empty.');
  }

  const allowedPattern = /^[a-zA-Z\u0080-\u024F0-9\s,'-]+$/u;

  if (!allowedPattern.test(city)) {
    throw new Error('Invalid city name provided.');
  }

  return city.trim();
};
