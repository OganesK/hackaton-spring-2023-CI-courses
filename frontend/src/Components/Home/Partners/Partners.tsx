import React from 'react';
import Grid from '@material-ui/core/Grid';

import Button from '../../UI/Buttons/OutlinedButton/Button';

import PartnersBlock from './PartnersBlock';
import ComponentTextHeader from '../ComponentTextHeader/ComponentTextHeader';

import useStyles from './Styles';

const Partners: () => JSX.Element = () => {
  const onClickHandler: () => void = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScoJn_WI2LwFpKzIdTQKl8V359VhtjFm4YYNyMQ2at0ARXGMA/viewform');
  };
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      style={{
        gap: 60,
      }}
    >
      <Grid container justifyContent="space-between" className={classes.partnersBox}>
        <Grid id="partner" container xl={3} lg={3} md={12}>
          <ComponentTextHeader text="Партнеры" />
        </Grid>
        <Grid container xl={8} lg={8} md={12}>
          <PartnersBlock />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Button onClick={onClickHandler} text="Стать партнером" className={classes.partnerButton} />
      </Grid>
    </Grid>
  );
};

export default Partners;
