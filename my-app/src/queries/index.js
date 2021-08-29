import {gql} from '@apollo/client'

export const GET_POKEMON = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      name
      weight
      height
      abilities {
        ability {
          name
        }
      }
      sprites {
        front_default
      }
      stats {
        base_stat
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
        }
      }
    }
  }
`