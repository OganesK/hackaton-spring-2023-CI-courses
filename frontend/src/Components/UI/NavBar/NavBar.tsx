import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Grid, Avatar, Menu, MenuItem, Divider, IconButton, Button } from '@mui/material';

import ListItemIcon from '@mui/material/ListItemIcon';
import { Login, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import * as Scroll from 'react-scroll';
import { CgCornerRightUp } from 'react-icons/cg';

import AccountMenu from './AccountMenu';

import Line from '../Line/Line';

import { useWindowSize } from '../../../rules/index';
import useStyles from './Styles';
import { userContext } from '../../../Context/context';
import { API_URL } from '../../../config';

import { NavBarProps } from './typing';

const Navbar: (props: NavBarProps) => JSX.Element = (props: NavBarProps) => {
  const context = useContext(userContext);
  const history = useHistory();

  const scroll = Scroll.animateScroll;

  const exitHandler: () => void = () => {
    context.user = {
      id: 0,
      firstname: 'string',
      lastname: 'string',
      bio: 'string',
      ownerCompanies: [],
      publishedEvent: [],
      avatar: {
        link:'string'
      },
      role: 'string',
      email: 'string',
    };
    fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' })
      .then()
      .catch(err => console.error(err));
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleProfileClick: () => void = () => {
    history.push(`/profile/${context.user.id}`);
  };

  const handleMessagesClick: () => void = () => {
    history.push('/messages');
  };



  const loginHandler: () => void = () => {
    history.push('/login');
  };

  const [width] = useWindowSize();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        container
        xs={12}
        alignItems="center"
        justifyContent="center"
        className={
          props.text === 'header' ? classes.navbar : props.text === 'footer' ? classes.navbarFooter : classes.navbar
        }
        style={{
          marginTop: props.topIdent ? props.topIdent : '',
          marginBottom: props.bottomIdent ? props.bottomIdent : '',
        }}
      >
        {width > 1349 ? (
          <Grid container alignItems="center" justifyContent="space-between" xs={10}>
            <Link className={props.text === 'header' ? classes.linkName : classes.linkNameFooter} to="/home">
              CI Curses
            </Link>

            <Grid>
              <Button>
                <Link
                  className={
                    props.text === 'header'
                      ? classes.link
                      : props.text === 'footer'
                      ? classes.linkFooter
                      : classes.projectLink
                  }
                  to="/projects"
                >
                  Курсы
                </Link>
              </Button>
              
              <Button>
                <Link
                  className={
                    props.text === 'header'
                      ? classes.link
                      : props.text === 'footer'
                      ? classes.linkFooter
                      : classes.projectLink
                  }
                  to="/news"
                >
                  Уроки
                </Link>
              </Button>
              <Button>
                <Link
                  className={
                    props.text === 'header'
                      ? classes.link
                      : props.text === 'footer'
                      ? classes.linkFooter
                      : classes.projectLink
                  }
                  to="/events"
                >
                  Трансляции
                </Link>
              </Button>
              
              {/* <Button>
                <Link
                  className={
                    props.text === 'header'
                      ? classes.link
                      : props.text === 'footer'
                      ? classes.linkFooter
                      : classes.projectLink
                  }
                  to="/crowdfunds"
                >
                  Краудфандинг
                </Link>
              </Button> */}
            </Grid>
            {props.text === 'header' || props.text === 'qwe' ? (
              <Grid>
                {context.user ? (
                  <AccountMenu logOutHandler={exitHandler} />
                ) : (
                  <Button onClick={context.user ? exitHandler : loginHandler}>
                    {context.user ? (
                      <div className={props.text === 'header' ? classes.link : classes.projectLink}>Выйти</div>
                    ) : (
                      <div className={props.text === 'header' ? classes.link : classes.projectLink}>Войти</div>
                    )}
                  </Button>
                )}
              </Grid>
            ) : (
              <IconButton aria-label="goTop" color="inherit">
                <CgCornerRightUp
                  onClick={(): void => {
                    scroll.scrollToTop();
                  }}
                />
              </IconButton>
            )}
          </Grid>
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            xs={width < 600 ? 12 : 10}
            style={{ background: props.text === 'header' ? (width < 600 ? '#252525' : 'inherit') : '#fff' }}
          >
            {props.text === 'header' || props.text === 'qwe' ? (
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                xs={width < 600 ? 10 : 12}
                style={{
                  padding: width < 600 ? '25px 0' : '0',
                }}
              >
                <Link className={props.text === 'header' ? classes.linkName : classes.linkNameFooter} to="/home">
                  NewVision
                </Link>

                <Grid style={props.text === 'header' ? { color: '#fff' } : { color: '#252525' }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ padding: '0' }}
                    onClick={handleClick}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>
                      <Link
                        className={props.text === 'header' ? classes.linkFooter : classes.projectLink}
                        to="/projects"
                      >
                        Курсы
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link className={props.text === 'header' ? classes.linkFooter : classes.projectLink} to="/events">
                        Прямая трансляцию
                      </Link>
                    </MenuItem>
                   
                    
                    <MenuItem>
                      <Link className={props.text === 'header' ? classes.linkFooter : classes.projectLink} to="/news">
                        Уроки
                      </Link>
                    </MenuItem>
                    {/* <MenuItem>
                      <Link
                        className={props.text === 'header' ? classes.linkFooter : classes.projectLink}
                        to="/crowdfunds"
                      >
                        Краудфандинг
                      </Link>
                    </MenuItem> */}
                    {props.text === 'header' || props.text === 'qwe' ? (
                      <>
                        <Divider />
                        {context.user ? (
                          <>
                            <MenuItem
                              onClick={handleProfileClick}
                              style={{
                                color: '#252525',
                                textDecoration: 'none',
                                fontSize: 18,
                                lineHeight: '100%',
                              }}
                            >
                              <Grid container direction="row">
                                <Grid container xs={3} style={{ border: '0px solid' }}>
                                  <Avatar
                                    sx={{ width: 24, height: 24, marginRight: 2 }}
                                    src={context.user?.avatar?.link}
                                  />
                                </Grid>
                                <Grid>Профиль</Grid>
                              </Grid>
                            </MenuItem>
                            <MenuItem
                              onClick={handleMessagesClick}
                              style={{
                                color: '#252525',
                                textDecoration: 'none',
                                fontSize: 18,
                                lineHeight: '100%',
                              }}
                            >
                              <Grid container direction="row">
                                <Grid container xs={3} style={{ border: '0px solid' }}>
                                  <ListItemIcon>
                                    <MessageIcon fontSize="small" />
                                  </ListItemIcon>
                                </Grid>
                                <Grid>Сообщения</Grid>
                              </Grid>
                            </MenuItem>
                            
                            <MenuItem
                              onClick={exitHandler}
                              style={{
                                color: '#252525',
                                textDecoration: 'none',
                                fontSize: 18,
                                lineHeight: '100%',
                              }}
                            >
                              <Grid container direction="row">
                                <Grid container xs={3} style={{ border: '0px solid' }}>
                                  <ListItemIcon>
                                    <Logout fontSize="small" />
                                  </ListItemIcon>
                                </Grid>
                                <Grid>Выйти</Grid>
                              </Grid>
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem
                            onClick={loginHandler}
                            style={{
                              color: '#252525',
                              textDecoration: 'none',
                              fontSize: 18,
                              lineHeight: '100%',
                            }}
                          >
                            <Grid container direction="row">
                              <Grid container xs={3} style={{ border: '0px solid' }}>
                                <ListItemIcon>
                                  <Login fontSize="small" />
                                </ListItemIcon>
                              </Grid>
                              <Grid>Войти</Grid>
                            </Grid>
                          </MenuItem>
                        )}
                      </>
                    ) : null}
                  </Menu>
                </Grid>
              </Grid>
            ) : (
              <Grid container justifyContent="space-between" alignItems="center">
                <Link className={props.text === 'header' ? classes.linkName : classes.linkNameFooter} to="/home">
                  CI Courses
                </Link>

                <Grid style={props.text === 'header' ? { color: '#fff' } : { color: '#252525' }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClick}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem>
                      <Link
                        className={
                          props.text === 'header'
                            ? classes.linkFooter
                            : props.text === 'footer'
                            ? classes.linkFooter
                            : classes.projectLink
                        }
                        to="/projects"
                      >
                        Курсы
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        className={
                          props.text === 'header'
                            ? classes.linkFooter
                            : props.text === 'footer'
                            ? classes.linkFooter
                            : classes.projectLink
                        }
                        to="/events"
                      >
                        Трансляции
                      </Link>
                    </MenuItem>
                    
                    <MenuItem>
                      <Link
                        className={
                          props.text === 'header'
                            ? classes.linkFooter
                            : props.text === 'footer'
                            ? classes.linkFooter
                            : classes.projectLink
                        }
                        to="/ads"
                      >
                        Уроки
                      </Link>
                    </MenuItem>
                    {props.text === 'header' || props.text === 'qwe' ? (
                      <>
                        <Divider />
                        {context.user ? (
                          <>
                            <MenuItem
                              onClick={handleProfileClick}
                              style={{
                                color: '#252525',
                                textDecoration: 'none',
                                paddingLeft: 20,
                                fontSize: 18,
                                lineHeight: '100%',
                              }}
                            >
                              <Avatar sx={{ width: 24, height: 24, marginRight: 2 }} /> Профиль
                            </MenuItem>
                            <MenuItem
                              onClick={exitHandler}
                              style={{
                                color: '#252525',
                                textDecoration: 'none',
                                paddingLeft: 25,
                                fontSize: 18,
                                lineHeight: '100%',
                              }}
                            >
                              <ListItemIcon>
                                <Logout fontSize="small" />
                              </ListItemIcon>
                              Выйти
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem
                            onClick={loginHandler}
                            style={{
                              color: '#252525',
                              textDecoration: 'none',
                              paddingLeft: 25,
                              fontSize: 18,
                              lineHeight: '100%',
                            }}
                          >
                            <ListItemIcon>
                              <Login fontSize="small" />
                            </ListItemIcon>
                            Войти
                          </MenuItem>
                        )}
                      </>
                    ) : null}
                  </Menu>
                </Grid>
                <IconButton aria-label="goTop" color="inherit">
                  <CgCornerRightUp
                    onClick={(): void => {
                      scroll.scrollToTop();
                    }}
                  />
                </IconButton>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      {props.text === 'footer' ? (
        <Grid container xs={10} style={{ margin: 'auto' }}>
          <Line marginTop={30} marginBottom={40} />
        </Grid>
      ) : null}
    </>
  );
};

export default Navbar;
