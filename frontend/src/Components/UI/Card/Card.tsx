import React from 'react';
import { Grid, Card, CardActions, CardContent, Typography } from '@material-ui/core';

import ArrowButton from '../Buttons/ArrowButton/ArrowButton';

import { CardProps } from './typings';

import '../../UI/Styles/CSS/Components/style.css';
import useStyles from './Styles';

const MyCard: (props: CardProps) => JSX.Element = (props: CardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <img src={props.avatar} alt="avatar" />
        </Typography>
        <Typography className={classes.cardHeader}>{props.header}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Grid>{props.title1}</Grid>
            <Grid className={classes.num}>
              <div className={ '1'}>{props.number1}</div>
            </Grid>
          </Grid>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Grid>{props.title2}</Grid>
            <Grid className={classes.num}>
              <div className={ '1'}>{props.number2}</div>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MyCard;
