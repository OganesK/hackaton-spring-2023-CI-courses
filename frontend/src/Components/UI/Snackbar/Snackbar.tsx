import React from 'react';

import { Snackbar, Alert } from '@mui/material';

import { SnackbarType } from './typing';

export default function SnackbarOnChange(props: SnackbarType): JSX.Element {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpenSnack(false);
  };

  return (
    <Snackbar open={props.openSnack} autoHideDuration={6000} onClose={() => handleClose}>
      <Alert onClose={handleClose} severity={props.isError ? 'error' : 'success'} sx={{ width: '100%' }}>
        {props.textInSnack}
      </Alert>
    </Snackbar>
  );
}
