import React from 'react';
import {Modal, Fade, Typography, TextField, Button, makeStyles, 
  Backdrop
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '15px'
  }
}))

export default function ModalNickname({
  modalNickname, 
  modalNicknameClose, 
  setNickname, 
  addPokemon
}) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalNickname}
      onClose={modalNicknameClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalNickname}>
        <div className={`${classes.paper} column-center`}>
          <Typography>Give your pokemon a nickname :</Typography>
          <TextField 
            id="standard-basic" 
            label="Pokemon's Nickname" 
            fullWidth 
            onChange={(e) => setNickname(e.target.value)} 
          />
          <Button 
            color="primary" 
            variant="contained" 
            onClick={addPokemon} 
            style={{marginTop: '20px'}}
          >
            <Typography>Get it</Typography>
          </Button>
        </div>
      </Fade>
    </Modal>
  )
}