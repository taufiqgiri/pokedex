import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  font: {
    fontSize: '16px'
  }
}))

export default function NoDataComponent() {
  const classes = useStyles();

  return (
    <div>
      <img src="/pokeball.png" height={100} width={100} alt="pokedex" />
      <Typography variant="h3" className={classes.font}>You haven't any pokemon yet</Typography>
    </div>
  )
}