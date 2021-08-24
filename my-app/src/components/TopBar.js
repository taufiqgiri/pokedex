import React from 'react';
import {makeStyles, AppBar, Typography, Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw'
  },
  // title: {
  //   flexFlow: 1
  // },
  containerAppbar: {
    height: '10vh',
    padding: '0 20px'
  },
  image: {
    height: '50%',
    marginRight: '10px'
  }
}));

export default function TopBar() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={`row-between ${classes.containerAppbar}`}>
        <div className={'row-center'} style={{height: '100%', cursor: 'pointer'}} onClick={() => history.push('/')}>
          <img src="/pokeball.png" className={classes.image} />
          <Typography variant="h6" className={classes.title}>
            Pokedex
          </Typography>
        </div>
        <Typography variant="h6" className={classes.title}>
          My Pokemon
        </Typography>
      </AppBar>
    </div>
  )
}