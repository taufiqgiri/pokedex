import React from 'react';
import {Modal, Fade, Backdrop, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

export default function ModalLoading({modalLoading}) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalLoading}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalLoading}>
        <img 
          src="/pokeball.png" 
          alt="Pokemon Loading" 
          className={`image-rotation`} 
          height={100}
          width={100}
        />
      </Fade>
    </Modal>
  )
}