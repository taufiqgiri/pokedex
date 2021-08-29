import React from 'react';
import {makeStyles, AppBar, Typography} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw'
  },
  title: {
    fontSize: '20px',
    "@media (max-width: 550px)": {
      fontSize: '14px'
    }
  },
  containerAppbar: {
    height: '10vh',
    padding: '0 20px',
    "@media (max-width: 1024px)": {
      height: '70px'
    },
    "@media (max-width: 550px)": {
      height: '50px',
      padding: '0 10px'
    }
  },
  image: {
    marginRight: '10px'
  }
}));

export default function TopBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={`row-between ${classes.containerAppbar}`}>
        <div 
          className={'row-center'} 
          style={{height: '100%', cursor: 'pointer'}} 
          onClick={() => history.push('/')}
        >
          <img 
            alt="pokeball" 
            src="/pokeball.png" 
            className={classes.image} 
            height={25} 
            width={25} 
          />
          <Typography variant="h6" className={classes.title}>
            Pokedex
          </Typography>
        </div>
        <div 
          onClick={() => history.push('/MyPokemon')} 
          style={{cursor: 'pointer'}}
        >
          <Typography 
            variant="h6" 
            className={classes.title}
          >
            My Pokemon
          </Typography>
        </div>
      </AppBar>
    </div>
  )
}