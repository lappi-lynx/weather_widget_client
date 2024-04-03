import { SuggestedCity } from '../../domain/types/SuggestedCity';
import { GEODOING_API_URL } from '../../infrastructure/constants';
import { validateCityParam } from '../../utils/validateCity';
import { buildReqestUrl } from '../../utils/buildReqestUrl';

export const fetchCities = async (city: string, signal: AbortSignal): Promise<SuggestedCity[]> => {
  const sanitizedCity = validateCityParam(city);
  const endpoint = buildReqestUrl(GEODOING_API_URL, '/search', { name: sanitizedCity });

  try {
    const response = await fetch(endpoint, { signal });
    if (!response.ok) {
      throw new Error(`${response.status} HTTP error fetching city suggestions.`);
    }
    const data = await response.json();

    // data.results might be undefined for a short time because of debouncing
    const uniqCitiesData = data.results?.reduce((unique: SuggestedCity[], city: SuggestedCity) => {
      if (!unique.some(u => u.name === city.name && u.country_id === city.country_id)) {
        unique.push(city);
      }
      return unique;
    }, []);

    return uniqCitiesData;
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Error fetching city suggestions:', e);
      }
    } else {
      console.log('An unexpected error occurred:', e);
      throw(e);
    }
    return [];
  }
};
