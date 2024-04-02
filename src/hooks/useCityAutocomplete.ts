import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { useFetchCities } from './useFetchCities';
import { SuggestedCity } from '../domain/types/SuggestedCity';
import { DEFAULT_CITY } from '../infrastructure/constants';

export const useCityAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState<SuggestedCity | null>(DEFAULT_CITY);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const { loading: loadingCities, data: citySuggestions, error: errorCities } = useFetchCities(debouncedSearchTerm);

  return {
    inputValue,
    setInputValue,
    selectedCity,
    setSelectedCity,
    citySuggestions,
    loadingCities,
    errorCities,
  };
};
