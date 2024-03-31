import { SuggestedCity } from '../components/types/SuggestedCity';
import { GEODOING_API_URL } from '../constants';

export const fetchCities = async (city: string): Promise<SuggestedCity[]> => {
  const endpoint = `${GEODOING_API_URL}/search?name=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`${response.status} HTTP error fetching city suggestions.`);
    }
    const data = await response.json();
    return data.results;
  } catch (e) {
    console.error('Error fetching city suggestions:', e);
    throw e;
  }
};
