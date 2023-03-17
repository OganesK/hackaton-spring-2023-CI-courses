import React from 'react';
import Grid from '@mui/material/Grid';

import { useWindowSize } from '../../rules/index';
import Background from '../../assets/img/SadCalendar.svg';
import useStyles from './Styles';

const EmptyEvents: () => JSX.Element = () => {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width;
  const secondDefaultBlockHeight = width / 2;
  const thirdDefaultBlockHeight = width / 3;

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      style={{
        height:
          width < 1200 && width > 599
            ? secondDefaultBlockHeight
            : width < 600
            ? firstDefaultBlockHeight
            : thirdDefaultBlockHeight,
      }}
    >
      <Grid
        container
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          marginTop: 50,
        }}
      />

      <Grid container justifyContent="center" alignItems="center" textAlign="center">
        <Grid className={classes.emptyText}>
          К сожалению, на выбранную дату <br /> событий не запланировано
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmptyEvents;
