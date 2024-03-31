import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.APP_GRAPHQL_API_URL,
  cache: new InMemoryCache()
});
