import React from 'react';
import {Card, CardActionArea, CardMedia, CardContent, makeStyles,
  Typography, CardActions, Button} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '150px',
    margin: '15px',
    "@media (max-width: 540px)": {
      width: '100px',
      margin: '10px'
    },
    transition: theme.transitions.create(
      ["margin-top", "margin-bottom", "box-shadow"],
      {duration: theme.transitions.duration.complex}
    ),
    "&:hover": {
      marginTop: '5px',
      marginBottom: '25px',
      boxShadow: '0px 10px 10px 5px rgba(54, 53, 53, 0.3)'
    }
  },
  card: {
    width: '170px',
    margin: '15px',
    "@media (max-width: 540px)": {
      width: '170px'
    }
  },
  cardAction: {
    cursor: 'default'
  },
  media: {
    height: 150,
    "@media (max-width: 540px)": {
      height: 100
    }
  },
  numOwned: {
    fontSize: '15px',
    "@media (max-width: 540px)": {
      fontSize: '12px'
    }
  },
  owned: {
    fontSize: '20px', 
    padding: '20px 5px',
    margin: '10px 0'
  },
  btnCard: {
    width: '40%', 
    margin: '5px 0',
    textTransform: 'none',
    fontSize: '12px'
  }
}));

export default function CardPokemon({data, chooseDelete}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  if (location.pathname === '/MyPokemon') {
    return (
      <Card className={classes.card}>
        <CardActionArea className={classes.cardAction}>
          <CardMedia
            className={classes.media}
            image={data.image}
            title={data.name}
          />
          <CardContent style={{padding: '5px 5px 0 5px'}}>
            <Typography gutterBottom variant="h5" className={'title-pokemon'}>
              {data.nickname}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={'row-center'} style={{paddingTop: '0'}}>
          <Button 
            className={classes.btnCard}
            color="inherit" 
            variant="contained"
            onClick={() => history.push(`/detail/${data.name}`)}
          >
            Detail
          </Button>
          <Button 
            className={classes.btnCard}
            color="inherit" 
            variant="contained"
            onClick={(name) => chooseDelete(data.name)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    )
  }

  return (
    <Card 
      className={classes.root} 
      onClick={() => history.push(`/detail/${data.name}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.image}
          title={data.name}
        />
        <CardContent style={{padding: '5px'}}>
          <Typography gutterBottom variant="h5" className={'title-pokemon'}>
            {data.name}
          </Typography>
          <Typography className={classes.numOwned}>
            {localStorage.getItem('myPokemon') ? 
            (JSON.parse(localStorage.getItem('myPokemon')).filter((el) => {
              return el.name === data.name
            }).length) : 0} owned
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};