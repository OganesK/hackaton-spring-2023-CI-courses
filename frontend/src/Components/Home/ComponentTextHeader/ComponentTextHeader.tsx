import React from 'react';
import Grid from '@mui/material/Grid';

import useStyles from './Styles';

interface TextHeaderProps {
  text: string;
}

const ComponentTextHeader: ({ text }: TextHeaderProps) => JSX.Element = ({ text }: TextHeaderProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.headerStyle}>
      {text}
    </Grid>
  );
};

export default ComponentTextHeader;
