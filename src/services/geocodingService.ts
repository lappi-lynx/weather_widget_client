import { SuggestedCity } from '../components/types/SuggestedCity';
import { GEODOING_API_URL } from '../constants';
import { validateCityParam } from '../utils/validateCity';
import { buildReqestUrl } from '../utils/buildReqestUrl';

export const fetchCities = async (city: string, signal: AbortSignal): Promise<SuggestedCity[]> => {
  const sanitizedCity = validateCityParam(city);
  const endpoint = buildReqestUrl(GEODOING_API_URL, '/search', { name: sanitizedCity });

  try {
    const response = await fetch(endpoint, { signal });
    if (!response.ok) {
      throw new Error(`${response.status} HTTP error fetching city suggestions.`);
    }
    const data = await response.json();
    return data.results;
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
