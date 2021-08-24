import React, {useState, useEffect} from 'react';
import {GET_POKEMON} from '../queries';
import {useLazyQuery} from '@apollo/client';

export default function HomePage() {
  const [offset, setOffset] = useState(0)
  const limit = 10
  const [dataPokemons, setDataPokemons] = useState([])

  const [getData, {error, data}] = useLazyQuery(
    GET_POKEMON, 
    {
      onCompleted: () => {
        setOffset(offset+limit)
        setDataPokemons([...dataPokemons, ...data.pokemons.results])
      }
    }
  );

  useEffect(() => {
    getData({variables: {"limit": limit, "offset": offset}})
  }, [])

  if (error) return <h1>error</h1>
  return (
    <div className={'page'}>
      {JSON.stringify(dataPokemons)}
      <button onClick={() => getData({variables: {"limit": limit, "offset": offset}})}>get again</button>
    </div>
  );
};