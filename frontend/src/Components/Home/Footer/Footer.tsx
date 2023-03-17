import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Grid from '@material-ui/core/Grid';

// import { FiArrowUpRight } from 'react-icons/fi';

import NavBar from '../../UI/NavBar/NavBar';
import useStyles from './Styles';

interface FooterProps {
  footerTopIdent?: number;
  footerMobileTopIdent?: number;
}

const Footer: (props: FooterProps) => JSX.Element = (props: FooterProps) => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

  return (
    <Grid
      xs={12}
      container
      justifyContent="center"
      alignItems="center"
      className={classes.footerContainer}
      style={{
        marginTop: isTabletOrMobile
          ? props.footerMobileTopIdent
            ? props.footerMobileTopIdent
            : 0
          : props.footerTopIdent
          ? props.footerTopIdent
          : 0,
      }}
    >
      {isTabletOrMobile ? null : (
        <Grid xs={12} container className={classes.footerNavBar}>
          <NavBar text="footer" />
        </Grid>
      )}
      {isTabletOrMobile ? (
        <Grid xs={10} container direction="column" alignItems="center" className={classes.footerInfo}>
          <Grid
            container
            xs={12}
            direction="column"
            justifyContent="space-between"
            style={{
              gap: 60,
            }}
          >
            <Grid
              container
              xs={6}
              direction="column"
              justifyContent="flex-start"
              className={classes.footerContactsContainer}
            >
              <Link className={classes.linkNameFooter} to="/home">
                CI Curses
              </Link>
              <Grid className={classes.footerHeaderTextContacts}>
                Хакатон 2033
              </Grid>
            </Grid>

            <Grid
              container
              xs={6}
              direction="column"
              justifyContent="flex-start"
              className={classes.footerContactsContainer}
            >
              <Grid className={classes.footerHeaderContacts}>Контакты</Grid>
              <Grid container className={classes.footerTitleTextContacts}>
                <Grid>info@gmail.com</Grid>
                <Grid>+7 334 555 33 33</Grid>
              </Grid>
            </Grid>

            {/* <Grid
                  container
                  xs
                  direction="column"
                  justifyContent="space-between"
                  className={classes.footerContactsContainer}
                >
                  <Grid className={classes.footerHeaderContacts}>Документы</Grid>
                  <Grid className={classes.footerTitleTextContacts}>Политика конфиденциальности.PDF</Grid>
                </Grid> */}
          </Grid>
        </Grid>
      ) : (
        <Grid
          xs={10}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.footerInfo}
        >
          <Grid
            container
            xs={12}
            direction="row"
            justifyContent="space-between"
            style={{
              gap: 40,
            }}
          >
            <Grid
              container
              xs
              direction="column"
              justifyContent="flex-start"
              className={classes.footerContactsContainer}
            >
              <Grid className={classes.footerHeaderTextContacts}>
                Хакатон 2033
              </Grid>
              {/* <Grid
                  container
                  alignItems="center"
                  style={{ fontWeight: 500 }}
                  className={classes.footerTitleTextContacts}
                >
                  Telegram-канал
                  <FiArrowUpRight />
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  style={{ fontWeight: 500 }}
                  className={classes.footerTitleTextContacts}
                >
                  Instagram
                  <FiArrowUpRight />
                </Grid> */}
            </Grid>

            <Grid
              container
              xs
              direction="column"
              justifyContent="flex-start"
              className={classes.footerContactsContainer}
            >
              <Grid className={classes.footerHeaderContacts}>Контакты</Grid>
              <Grid container className={classes.footerTitleTextContacts}>
                <Grid>info@gmail.com</Grid>
                <Grid>+7 666 666 3333</Grid>
              </Grid>
            </Grid>

            <Grid
              container
              xs
              direction="column"
              justifyContent="flex-start"
              className={classes.footerContactsContainer}
            >
              <Grid className={classes.footerHeaderContacts}>Документы</Grid>
              <Grid className={classes.footerTitleTextContacts}>Политика конфиденциальности.PDF</Grid>
              {/* <Grid className={classes.footerTitleTextContacts}>Пользовательское соглашение.PDF</Grid> */}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Footer;
