import { useState, useEffect } from 'react';
import { fetchCities } from '../application/services/geocodingService';
import { SuggestedCity } from '../domain/types/SuggestedCity';

export const useFetchCities = (searchTerm: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SuggestedCity[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const cachedTerm = localStorage.getItem(searchTerm);
        if (cachedTerm) {
          setData(JSON.parse(cachedTerm));
        } else {
          const results = await fetchCities(searchTerm, controller.signal);
          setData(results || []);
          localStorage.setItem(searchTerm, JSON.stringify(results || []));
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.length >= 2) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [searchTerm]);

  return { loading, data, error };
};
