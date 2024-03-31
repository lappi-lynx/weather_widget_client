export const fetchCities = async (city: string) => {
  const endpoint = `${import.meta.env.APP_GEODOING_API_URL}/search?name=${encodeURIComponent(city)}`;

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
