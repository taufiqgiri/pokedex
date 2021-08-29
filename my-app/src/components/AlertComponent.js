import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar} from '@material-ui/core';

export default function AlertComponent({alert, closeAlert, severity, pokemonName}) {
  return (
    <Snackbar 
      open={alert} 
      autoHideDuration={3000} 
      onClose={closeAlert} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert 
        onClose={closeAlert} 
        severity={severity === 'success' ? 'success' : 'error'} 
        elevation={6} 
        variant="filled"
      >
        {severity === 'error' ? 
        `Oops!! You fail to catch ${pokemonName?.toUpperCase()}` :
        (severity === 'success' ?
          `Gotcha!! You catched ${pokemonName?.toUpperCase()}` :
          'Nickname has already exist!'
        )}
      </MuiAlert>
    </Snackbar>
  )
}