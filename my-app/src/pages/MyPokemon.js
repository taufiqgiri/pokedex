import React, {useState} from 'react';
import {CardPokemon} from '../components';
import {Typography, makeStyles} from '@material-ui/core';
import {ModalDelete, NoDataComponent} from '../components';

const useStyles = makeStyles((theme) => ({
  containerCard: {
    margin: '10px 0'
  }
}))

export default function MyPokemon() {
  const classes = useStyles();
  const [dataPokemons, setDataPokemons] = useState(JSON.parse(localStorage.getItem('myPokemon')));
  const [modalDelete, setModalDelete] = useState(false);
  const [pokemonName, setPokemonName] = useState('');

  const updateData = (value) => {
    setDataPokemons(value)
  }

  const deletePokemon = (name) => {
    let pokemons = JSON.parse(localStorage.getItem('myPokemon'));
    pokemons = pokemons.filter((el) => {
      return el.name !== name
    })
    localStorage.setItem('myPokemon', JSON.stringify(pokemons));
    updateData(pokemons)
  };

  const submitDelete = (name) => {
    setModalDelete(false);
    deletePokemon(name);
  };

  const chooseDelete = (name) => {
    setModalDelete(true);
    setPokemonName(name);
  };

  return (
    <div className={'page'}>
      <Typography variant="h1" className={'title-page'}>My Pokemon</Typography>
      <div className={`row-center ${classes.containerCard}`}>
        {dataPokemons?.length > 0 ?
        (
          dataPokemons?.map((data, index) => {
            return <CardPokemon key={index} data={data} chooseDelete={chooseDelete} />
          })
        ) :
        (
          <NoDataComponent />
        )}
      </div>

      <ModalDelete 
        modalDelete={modalDelete} 
        submitDelete={submitDelete}
        pokemonName={pokemonName}
        setModalDelete={setModalDelete}
      />
    </div>
  )
}