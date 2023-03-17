import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from 'react-responsive';

import useStyles from './Styles';
import Button from '../../UI/Buttons/OutlinedButton/Button';

const BidProject: () => JSX.Element = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const onClickHandler: () => void = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScoJn_WI2LwFpKzIdTQKl8V359VhtjFm4YYNyMQ2at0ARXGMA/viewform');
  };

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.insideProjectBidBox}
      style={{ gap: isTabletOrMobile ? 20 : 35 }}
    >
      <Grid item className={classes.header}>
        Понравился проект? Поддержите!
      </Grid>
      <Grid container className={classes.article}>
        Заполните анкету и назначьте время для онлайн-встречи с представителем проекта.
      </Grid>
      {isTabletOrMobile ? (
        <Grid container style={{ marginTop: 30 }}>
          <Button
            onClick={onClickHandler}
            text={isMobile ? 'Инвестировать' : 'Инвестировать в проект'}
            isOrange={true}
            className={classes.bidButtonOnProject}
          />
        </Grid>
      ) : (
        <Grid item>
          <Button
            onClick={onClickHandler}
            text={'Инвестировать в проект'}
            isWhite={true}
            className={classes.bidButtonOnProject}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default BidProject;
