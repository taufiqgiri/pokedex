import React from 'react';
import {Modal, Fade, Typography, Button, makeStyles, 
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

export default function ModalDelete({
  modalDelete, 
  pokemonName,
  setModalDelete,
  submitDelete
}) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalDelete}
      onClose={() => setModalDelete(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalDelete}>
        <div className={`${classes.paper} column-center`}>
          <Typography>{`Do you want to release your ${pokemonName}?`}</Typography>
          <div className={'row-center'}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={(name) => submitDelete(pokemonName)}
              style={{margin: '5px'}}
            >
              Yes
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => setModalDelete(false)}
              style={{margin: '5px'}}
            >
              No
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}