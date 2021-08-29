import React, {useState, useEffect} from 'react';
import {GET_POKEMON} from '../queries';
import {useLazyQuery} from '@apollo/client';
import {CardPokemon} from '../components';
import {Typography, Button, CircularProgress, makeStyles, Avatar, 
  IconButton
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
  containerCard: {
    margin: '10px 0',
    "@media (max-width: 540px)": {
      margin: '0'
    }
  }
}))

export default function HomePage() {
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const limit = 14;
  const [dataPokemons, setDataPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [getData, {data}] = useLazyQuery(
    GET_POKEMON, 
    {
      onCompleted: () => {
        setOffset(offset+limit);
        setDataPokemons([...dataPokemons, ...data.pokemons.results]);
        setLoading(false);
      }
    }
  );

  const loadData = () => {
    setLoading(true);
    getData({variables: {"limit": limit, "offset": offset}});
  };

  var mybutton = document.getElementById("btn-up");

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={'page'}>
      <IconButton style={{padding: 0}} id="btn-up" onClick={topFunction}>
        <Avatar style={{backgroundColor: 'blue'}}>
          <ArrowUpwardIcon />
        </Avatar>
      </IconButton>
      <Typography variant="h1" className={'title-page'}>Pokemon's List</Typography>
      <div className={`row-center ${classes.containerCard}`}>
        {dataPokemons.map((data, index) => {
          return <CardPokemon key={index} data={data} />
        })}
      </div>
      {loading ?
      (
        <CircularProgress />
      ) :
      (
        <Button 
          color="primary" 
          variant="contained" 
          onClick={loadData}
        >
          See More
        </Button>
      )}
    </div>
  );
}