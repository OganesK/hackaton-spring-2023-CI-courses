import React, { useState } from 'react';

import { Grid, OutlinedInput } from '@mui/material';

import { EmailDispatchMutation } from './graphql/mutations';

import SnackbarOnChange from '../UI/Snackbar/Snackbar';
import Button from '../UI/Buttons/OutlinedButton/Button';
import useStyles from './Styles';

const EventInfo: () => JSX.Element = () => {
  const EmailDispatchHandler = EmailDispatchMutation();

  const [emailValue, setEmailValue] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const onClickHandler: () => Promise<void> = async () => {
    if (emailValue) {
      const emailData = {
        email: emailValue,
      };
      await EmailDispatchHandler(emailData);
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
      setEmailValue('');
    }
  };

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.eventInfoContainer}>
      <Grid container className={classes.eventInfoHeader}>
        Будьте в курсе всех событий
      </Grid>
      <Grid container className={classes.eventInfoTitle}>
        Оформите бесплатную подписку и узнавайте о предстоящих Трансляциих платформы
      </Grid>
      <Grid container direction="row" justifyContent="space-between" className={classes.eventInfoMailBox}>
        <Grid item xs={9}>
          <OutlinedInput
            placeholder="Адрес почты"
            defaultValue={emailValue}
            value={emailValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailValue(e.target.value)}
            fullWidth={true}
            id="custom-css-outlined-input"
            size="small"
          />
        </Grid>
        <Grid item xs>
          <Button onClick={onClickHandler} text="ОК" className={classes.eventInfoButton} />
        </Grid>
      </Grid>
      <SnackbarOnChange openSnack={openSnack} setOpenSnack={setOpenSnack} textInSnack="Подписка прошла успешно!" />
    </Grid>
  );
};

export default EventInfo;
