/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-scroll';
import Button from '@material-ui/core/Button';
import { useMediaQuery } from 'react-responsive';

import { NavigationProps } from './typings';

import useStyles from './Styles';

const SideBarNavigation: (props: NavigationProps) => JSX.Element = (props: NavigationProps) => {
  const classes = useStyles();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

  return (
    <>
      {isTabletOrMobile ? null : (
        <Grid
          container
          xs={3}
          direction="row"
          style={{
            position: 'absolute',
          }}
        >
          <Grid className={classes.GridLink}>
            <Button>
              <Link
                activeClass={classes.activeLink}
                className={classes.link}
                to="projectData"
                spy={true}
                hashSpy={true}
                smooth={true}
                offset={-150}
              >
                Данные курса
              </Link>
            </Button>
          </Grid>
          {props.isDescription || props.isOwner ? (
            <Grid className={classes.GridLink}>
              <Button>
                <Link
                  activeClass={classes.activeLink}
                  className={classes.link}
                  style={{ color: props.isDescription ? '' : '#AAADB2' }}
                  to="howItWorks"
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  offset={-150}
                >
                  Как это работает
                </Link>
              </Button>
            </Grid>
          ) : null}

          {/* {props.isWorkers || props.isOwner ? ( */}
          <Grid className={classes.GridLink}>
            <Button>
              <Link
                activeClass={classes.activeLink}
                className={classes.link}
                // style={{ color: props.isWorkers ? '' : '#AAADB2' }}
                to="team"
                spy={true}
                hashSpy={true}
                smooth={true}
                offset={-150}
              >
                Команда
              </Link>
            </Button>
          </Grid>
          {/* ) : null} */}

            <Grid className={classes.GridLink}>
              <Button>
                <Link
                  activeClass={classes.activeLink}
                  className={classes.link}
                  style={{ color: props.isCrowd ? '' : '#AAADB2' }}
                  to="crowdfunding"
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  offset={-150}
                >
                  Тесты
                </Link>
              </Button>
            </Grid>
            <Grid className={classes.GridLink}>
              <Button>
                <Link
                  activeClass={classes.activeLink}
                  className={classes.link}
                  style={{ color: props.isNews ? '' : '#AAADB2' }}
                  to="news"
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  offset={-150}
                >
                  уроки
                </Link>
              </Button>
            </Grid>
          {props.isResources || props.isOwner ? (
            <Grid className={classes.GridLink}>
              <Button>
                <Link
                  activeClass={classes.activeLink}
                  className={classes.link}
                  style={{ color: props.isResources ? '' : '#AAADB2' }}
                  to="resources"
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  offset={-150}
                >
                  Ресурсы
                </Link>
              </Button>
            </Grid>
          ) : null}
          
          {props.isNews || props.isOwner ? (
            <Grid className={classes.GridLink}>
              <Button>
                <Link
                  activeClass={classes.activeLink}
                  className={classes.link}
                  style={{ color: props.isNews ? '' : '#AAADB2' }}
                  to="news"
                  spy={true}
                  hashSpy={true}
                  smooth={true}
                  offset={-150}
                >
                  уроки
                </Link>
              </Button>
            </Grid>
          ) : null}
          
        </Grid>
      )}
    </>
  );
};

export default SideBarNavigation;
