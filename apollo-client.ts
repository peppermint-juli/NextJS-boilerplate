/* eslint-disable object-curly-newline */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    }
  };
});


const client = new ApolloClient({
  // eslint-disable-next-line unicorn/prefer-spread
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;