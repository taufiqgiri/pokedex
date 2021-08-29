import React, {useState, useEffect} from 'react';
import {Typography, makeStyles, Chip, Divider, Avatar, Button} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {GET_POKEMON_DETAIL} from '../queries';
import {useParams} from 'react-router-dom';
import {SkillPokemon, MovePokemon, AlertComponent, ModalLoading,
  ModalNickname
} from '../components';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  pokemonName: {
    fontSize: '25px',
    fontWeight: '500',
    marginBottom: '15px',
    "@media (max-width: 540px)": {
      fontSize: '14px',
      fontWeight: '400',
      marginBottom: '10px'
    }
  },
  information: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    "@media (max-width: 540px)": {
      flexDirection: 'column'
    }
  },
  personal: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    "@media (max-width: 540px)": {
      width: '80%',
      alignItems: 'center',
    },
    "@media (max-width: 414px)": {
      width: '100%'
    }
  },
  image: {
    width: '40%',
    "@media (max-width: 540px)": {
      width: '30%'
    }
  },
  chipAbility: {
    margin: '5px'
  },
  profile: {
    width: '60%',
    border: '1px solid #d4d4d4',
    padding: '5px 20px',
    borderRadius: '10px',
    margin: '10px 0',
    "@media (max-width: 540px)": {
      width: '80%'
    }
  },
  titleProfile: {
    fontSize: '16px',
    fontWeight: '600',
    "@media (max-width: 540px)": {
      fontSize: '12px',
      fontWeight: '400'
    }
  },
  contentProfile: {
    fontSize: '40px',
    fontWeight: '600',
    "@media (max-width: 540px)": {
      fontSize: '25px'
    }
  },
  numOwned: {
    fontSize: '15px',
    "@media (max-width: 540px)": {
      fontSize: '10px'
    }
  },
  owned: {
    fontSize: '20px', 
    padding: '20px 5px',
    margin: '10px 0',
    "@media (max-width: 540px)": {
      fontSize: '15px'
    }
  },
  buttonCatch: {
    position: 'fixed',
    zIndex: 1,
    marginBottom: '20px',
    bottom: 0
  }
}))

export default function DetailPokemon() {
  const history = useHistory();
  const {name} = useParams();
  const classes = useStyles();
  const {data} = useQuery(
    GET_POKEMON_DETAIL, 
    {variables: {"name": name}}
  );
  const [modalLoading, setModalLoading] = useState(false);
  const [modalNickname, setModalNickname] = useState(false);
  const [nickname, setNickname] = useState('');
  const [owned, setOwned] = useState(0);
  const [severity, setSeverity] = useState('');
  const [alert, setAlert] = useState(false);

  const modalLoadingOpen = () => {
    setModalLoading(true);
  };

  const modalNicknameClose = () => {
    setModalNickname(false);
    setAlert(true);
    setSeverity('error');
  };

  const closeAlert = () => {
    setAlert(false)
    if (severity === 'success') {
      history.push('/MyPokemon');
    }
  }

  const addPokemon = () => {
    const newPokemon = {
      nickname, 
      name: data.pokemon.name, 
      image: data.pokemon.sprites.front_default
    };
    let myPokemon = JSON.parse(localStorage.getItem('myPokemon'));
    if (!myPokemon) {
      myPokemon = [newPokemon];
      localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
      setModalNickname(false);
      setAlert(true);
      setSeverity('success');
    } else {
      const filtered = myPokemon.filter(el => {
        return el.nickname === nickname
      })
      if (filtered.length > 0) {
        setAlert(true);
        setSeverity('double-name');
      } else {
        myPokemon.push(newPokemon);
        localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
        setModalNickname(false);
        setAlert(true);
        setSeverity('success');
      }
    }
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('myPokemon'))
    if (storage && storage.length > 0) {
      setOwned((storage.filter((el) => {
        return el.name === data?.pokemon.name
      })).length)
    }
  }, [data])

  useEffect(() => {
    if (modalLoading) {
      setTimeout(() => {
        const randNumber = Math.round(Math.random())
        if (randNumber) {
          setModalLoading(false);
          setModalNickname(true);
        } else {
          setModalLoading(false);
          setAlert(true);
          setSeverity('error');
        }
      }, 3000)
    }
  }, [modalLoading])
  
  return (
    <div className={'page column-center'} style={{marginBottom: '70px'}}>
      <Typography variant="h1" className={'title-page'}>Pokemon's Detail</Typography>
      <div className={classes.information}>
        <div className={classes.personal}>
          <img 
            alt="pokemon" 
            src={data?.pokemon.sprites.front_default} 
            className={classes.image} 
          />
          <div>
            <Typography 
              variant="h3" 
              className={classes.pokemonName}
            >
              {data?.pokemon.name.toUpperCase()}
            </Typography>
            <div className={`row-center`}>
              {data?.pokemon.abilities.map((value, index) => {
                return (
                  <Chip 
                    label={value.ability.name} 
                    key={index} 
                    variant="outlined"
                    color="primary" 
                    className={classes.chipAbility} 
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className={`${classes.personal}`}>
          <Chip
            avatar={
              <Avatar>
                <Typography className={classes.numOwned}>{owned}</Typography>
              </Avatar>
            }
            label="owned"
            color="primary"
            className={classes.owned}
          />
          <div className={`${classes.profile} row-evenly`}>
            <div>
              <Typography variant="body1" className={classes.titleProfile}>
                Height
              </Typography>
              <Typography 
                variant="body1" 
                className={classes.contentProfile}
              >
                {data?.pokemon.height} "
              </Typography>
            </div>
            <Divider orientation="vertical" flexItem style={{backgroundColor: '#d4d4d4'}} />
            <div>
              <Typography variant="body1" className={classes.titleProfile}>
                Weight
              </Typography>
              <Typography 
                variant="body1" 
                className={classes.contentProfile}
              >
                {data?.pokemon.weight} lb
              </Typography>
            </div>
          </div>
          <div className={`${classes.profile} column-left`}>
            <Typography 
              variant="body1" 
              className={classes.titleProfile} 
              align="left"
            >
              Types
            </Typography>
            <div>
              {data?.pokemon.types.map((type, index) => {
                return (
                  <Chip 
                    label={type.type.name} 
                    color="secondary" 
                    key={index} 
                    variant="outlined" 
                    className={classes.chipAbility} 
                  /> 
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <SkillPokemon data={data?.pokemon.stats} />
      <MovePokemon data={data?.pokemon.moves} />
      <Button 
        color="primary" 
        variant="contained" 
        className={classes.buttonCatch} 
        onClick={modalLoadingOpen}
      >
        <Typography>Catch</Typography>
      </Button>

      <ModalLoading modalLoading={modalLoading} />

      <ModalNickname
        modalNickname={modalNickname}
        modalNicknameClose={modalNicknameClose}
        setNickname={setNickname}
        addPokemon={addPokemon}
      />

      <AlertComponent 
        alert={alert} 
        closeAlert={closeAlert} 
        severity={severity} 
        pokemonName={data?.pokemon.name}
      />
    </div>
  )
}