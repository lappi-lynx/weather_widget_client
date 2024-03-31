import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API_URL } from '../constants';

export const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache()
});
