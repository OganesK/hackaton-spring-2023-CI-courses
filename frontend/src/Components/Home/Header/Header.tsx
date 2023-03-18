import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';

import useStyles from './Styles';
import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import NavBar from '../../UI/NavBar/NavBar';

interface HeaderProps {
  platformTitle?: string;
  platformDescription?: string;
}

const Header: (props: HeaderProps) => JSX.Element = (props: HeaderProps) => {
  const history = useHistory();

  const onClickHandler: () => void = () => {
    history.push('/projects');
  };

  const classes = useStyles();
  return (
    <Grid
      container
      xs={12}
      alignItems="baseline"
      justifyContent="center"
      className={classes.sloganImageBox}
      style={{
        backgroundImage: 'url(headerImage.webp)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <NavBar text="header" />
      <Grid xs={10} container direction="column" justifyContent="space-evenly" className={classes.sloganTextContainer}>
        <Grid xs={12} container className={classes.sloganText}>
          {props.platformTitle ? props.platformTitle : 'platformTitle'}
        </Grid>
        <Grid xs={5} container className={classes.sloganTextDesc}>
          {props.platformDescription ? props.platformDescription : 'platformDescription'}
        </Grid>
        <Grid style={{ marginTop: 30 }}>
          <ArrowButton onClick={onClickHandler} text="Смотреть курсы" className={classes.colorLink} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
