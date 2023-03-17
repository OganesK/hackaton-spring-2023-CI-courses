import React from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import { useWindowSize } from '../../rules/index';

import { ContactTypes } from './typings';

import useStyles from './Styles';

const ContactsBlock: (props: ContactTypes) => JSX.Element = (props: ContactTypes) => {
  const classes = useStyles();
  const [width] = useWindowSize();

  return (
    <Tooltip title={props.isApproved === false ? 'Контакты проходят модерацию, только вы видите их.' : ''}>
      <Grid
        container
        xs={width < 961 ? 10 : 12}
        direction="column"
        style={{ gap: width < 961 ? 60 : 30, margin: width < 961 ? 'auto' : 0 }}
      >
        <Grid item container direction="column" style={{ gap: 12 }}>
          <Grid
            container
            justifyContent={width < 961 ? 'center' : 'flex-start'}
            className={width < 961 ? classes.contactsMobileTitle : classes.contactsTitle}
          >
            Телефон
          </Grid>
          {props.phones.map((phone, i) => (
            <Grid
              key={i}
              item
              container
              justifyContent={width < 961 ? 'center' : 'flex-start'}
              className={width < 961 ? classes.contactsMobileText : classes.contactsText}
            >
              {props.phones[i]}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" style={{ gap: 12 }}>
          <Grid
            container
            justifyContent={width < 961 ? 'center' : 'flex-start'}
            className={width < 961 ? classes.contactsMobileTitle : classes.contactsTitle}
          >
            Email
          </Grid>
          {props.emails.map((email, i) => (
            <Grid
              key={i}
              item
              container
              justifyContent={width < 961 ? 'center' : 'flex-start'}
              className={width < 961 ? classes.contactsMobileText : classes.contactsText}
            >
              {props.emails[i]}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" style={{ gap: 12 }}>
          <Grid
            container
            justifyContent={width < 961 ? 'center' : 'flex-start'}
            className={width < 961 ? classes.contactsMobileTitle : classes.contactsTitle}
          >
            Адрес
          </Grid>
          {props.addresses.map((address, i) => (
            <Grid
              key={i}
              item
              container
              justifyContent={width < 961 ? 'center' : 'flex-start'}
              className={width < 961 ? classes.contactsMobileText : classes.contactsText}
            >
              {props.addresses[i]}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Tooltip>
  );
};

export default ContactsBlock;
