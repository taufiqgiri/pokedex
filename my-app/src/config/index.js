import {InMemoryCache, ApolloClient} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app',
  cache: new InMemoryCache()
})

export default client