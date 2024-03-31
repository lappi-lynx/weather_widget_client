import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_FORECAST_FROM_COORDS_QUERY  } from '../graphql/queries';


type WidgetProps = {
  latitude: number;
  longitude: number;
  days: number;
  theme: 'light' | 'dark';
}

export const Widget: React.FC<WidgetProps> = ({ latitude, longitude, days, theme }) => {
  console.log("Widget props", { latitude, longitude, days, theme });
  const { loading, error, data } = useQuery(GET_FORECAST_FROM_COORDS_QUERY, {
    variables: { latitude, longitude, days },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("Response data", data);

  return (
    <div className={`weather-widget ${theme}`}>
      Widget content
    </div>
  );
};
