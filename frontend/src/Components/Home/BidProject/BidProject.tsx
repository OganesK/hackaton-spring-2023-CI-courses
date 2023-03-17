import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import useStyles from './Styles';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import { userContext } from '../../../Context/context';

const BidProject: () => JSX.Element = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 599px)' });

  const history = useHistory();
  const context = useContext(userContext);

  const onClickHandler: () => void = () => {
    if (context && context.user) {
      history.push(`/profile/${context.user.id}`);
    } else {
      history.push('/signup');
    }
  };

  const classes = useStyles();

  return (
    <>
      {isTabletOrMobile ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.bidMobileBox}
          style={{ gap: 35 }}
        >
          <Grid item className={classes.landingHeader}>
            Зарегистрируйте себя и свою компанию
          </Grid>

          <Grid container>
            <Button
              onClick={onClickHandler}
              text="Зарегистрироваться"
              isOrange={true}
              className={classes.bidMobileButton}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className={classes.bidBox}
          style={{ gap: 35 }}
        >
          <Grid item className={classes.landingHeader}>
            Зарегистрируйте себя и свою компанию
          </Grid>

          <Grid item>
            <Button onClick={onClickHandler} text="Зарегистрироваться" isWhite={true} className={classes.bidButton} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BidProject;
