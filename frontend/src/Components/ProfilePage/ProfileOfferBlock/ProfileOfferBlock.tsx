/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import ShowMoreText from 'react-show-more-text';

import { Grid, Tooltip, Divider, Menu, MenuItem, IconButton, Avatar } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
import style from '../../../Pages/SingleProjectPage/markdown-styles.module.css';

import Line from '../../UI/Line/Line';

import PostEditModal from '../EntityEditModals/PostEditModal';

import '../../UI/Styles/CSS/Components/style.css';
import '../../UI/Styles/CSS/Components/posterAnimation.css';

import { useWindowSize } from '../../../rules/index';
import useStyles from './Styles';

import { DeleteOnePostMutation } from '../../SingleProjectPage/graphql/mutations';
import { ProfileOfferProps } from './typing';

const ProfileOfferBlock: (props: ProfileOfferProps) => JSX.Element = (props: ProfileOfferProps) => {
  const classes = useStyles();
  const [width] = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const deleteOnePostHandler = DeleteOnePostMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose: () => void = () => {
    setAnchorEl(null);
  };

  const editButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openEdit) {
      setOpenEdit(!openEdit);
      setAnchorEl(null);
    } else {
      setOpenEdit(!openEdit);
      setAnchorEl(null);
    }
  };

  const history = useHistory();

  const formattedDate = new Date(props.publicDate).toLocaleString().slice(0, -3);
  const formattedDateLetters = new Date(props.publicDate)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!props.isProfilePage) {
      history.push(`/profile/${props.offerOwnerId}`);
    }
  };

  function createMarkup() {
    return { __html: props.shortDescription };
  }
  return (
    <>
      <Tooltip title={props.isApproved === false ? 'Объявление проходит модерацию, только вы видите его.' : ''}>
        <Grid
          item
          container
          style={{
            filter: props.isApproved ? 'none' : 'brightness(0.6) opacity(0.8)',
            wordBreak: 'break-word',
            gap: 20,
          }}
        >
          <Grid container style={{ gap: 30 }}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Grid container direction="row" alignItems="center" style={{ gap: 20 }}>
                  <Avatar
                    alt="user"
                    sx={{
                      width: 48,
                      height: 48,
                      cursor: props.isProfilePage ? 'default' : 'pointer',
                    }}
                    src={props.ownerAvatar}
                    onClick={handleProfileClick}
                  />
                  <Grid item>
                    <Grid container direction="column" justifyContent="center" style={{ gap: 6 }}>
                      <Grid
                        item
                        className={classes.nameText}
                        style={{
                          cursor: props.isProfilePage ? 'default' : 'pointer',
                        }}
                        onClick={handleProfileClick}
                      >
                        {props.firstname}&nbsp;{props.lastname}
                      </Grid>
                      <Grid item className={classes.offerDateText}>
                        {formattedDateLetters}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {props.isOwner ? (
                <Grid style={{ color: '#AAADB2' }}>
                  <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{ zIndex: 1 }}
                  >
                    <MenuItem onClick={(e: React.MouseEvent) => editButtonHandler(e)}>
                      <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                        <EditIcon />
                        <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Редактировать</div>
                      </Grid>
                    </MenuItem>
                    <Divider variant="middle" />

                    <MenuItem
                      onClick={async () => {
                        await deleteOnePostHandler(props.contentId);
                        await props.refetch();
                      }}
                    >
                      <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                        <CloseIcon />
                        <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Удалить</div>
                      </Grid>
                    </MenuItem>
                  </Menu>
                </Grid>
              ) : null}
            </Grid>
            <Grid container style={{ gap: 20 }}>
              <Grid container className={classes.titleText}>
                {props.title}
              </Grid>
              <Grid container>
                <div dangerouslySetInnerHTML={createMarkup()} />
                {/* <ShowMoreText
                  lines={10}
                  more="Читать далее"
                  less="Скрыть описание"
                  className={classes.collapseReactMarkdown}
                  anchorClass={classes.collapseAnchor}
                  onClick={(): void => setIsExpanded(!isExpanded)}
                  expanded={isExpanded}
                  truncatedEndingComponent={'... '}
                >
                  <ReactMarkdown
                    key={props.shortDescription}
                    plugins={[gfm, a11yEmoji]}
                    className={style.reactMarkDown}
                  >
                    {props.shortDescription}
                  </ReactMarkdown>
                </ShowMoreText> */}
              </Grid>
              {props.img && props.img !== 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg' ? (
                <Grid container xs={width > 960 ? 10 : 12}>
                  <img src={props.img} className={classes.offerImg} />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Tooltip>
      <Line marginTop={40} marginBottom={40} />
      {props.isOwner ? (
        <PostEditModal
          postid={props.id}
          isOfferFilter={props.isOffer ? props.isOffer : false}
          isNewsFilter={props.isNews ? props.isNews : false}
          isResourceFilter={props.isResource ? props.isResource : false}
          ownerId={props.ownerId}
          open={openEdit}
          handleOpenClose={() => setOpenEdit(!openEdit)}
        />
      ) : null}
    </>
  );
};

export default ProfileOfferBlock;
