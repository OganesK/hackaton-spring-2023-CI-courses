/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
import React, { useState } from 'react';

import { Grid, Tooltip, Divider, Menu, MenuItem, IconButton } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import ShownFullscreenPostContent from '../../UI/Modal/ShownFullscreenPostContent';
import '../../UI/Styles/CSS/Components/style.css';
import '../../UI/Styles/CSS/Components/posterAnimation.css';

import PostEditModal from '../EntityEditModals/PostEditModal';
import { DeleteOnePostMutation } from '../../SingleProjectPage/graphql/mutations';
import { ProfileNewsProps } from './typing';

import { useWindowSize } from '../../../rules/index';

import useStyles, { ArrowIconWrapper, DescriptionText } from './Styles';

const ProfileNewsBlock: (props: ProfileNewsProps) => JSX.Element = (props: ProfileNewsProps) => {
  const classes = useStyles();

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 6;
  const secondDefaultBlockHeight = width / 4;
  const thirdDefaultBlockHeight = width / 2;
  const [openEdit, setOpenEdit] = useState(false);
  const [openFullscreenModal, setOpenFullscreenModal] = useState(false);

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

  const fullscreenModalHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openFullscreenModal) {
      setOpenFullscreenModal(!openFullscreenModal);
    } else {
      setOpenFullscreenModal(!openFullscreenModal);
    }
  };

  const formattedDate = new Date(props.publicDate).toLocaleString().slice(0, -3);
  const dateToShow: string = formattedDate.slice(0, 10);
  const formattedDateLetters = new Date(props.publicDate)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString();

  return (
    <>
      <Tooltip
        title={
          props. === false && openFullscreenModal === false
            ? 'Новость проходит модерацию, только вы видите её.'
            : ''
        }
      >
        <Grid
          item
          container
          style={{
            filter: props. ? 'none' : 'brightness(0.6) opacity(0.8)',
            wordBreak: 'break-word',
            gap: 20,
            marginBottom: 10,
          }}
        >
          <Grid
            className="hover-text-one"
            style={{
              backgroundColor:
                props.img && props.img !== 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg'
                  ? 'inherit'
                  : '#CFD1DC',
              cursor: 'pointer',
            }}
            onClick={(e: React.MouseEvent) => fullscreenModalHandler(e)}
          >
            <figure
              className="effect-text-three"
              style={{
                height: props.heightTwoElementInGrid
                  ? props.heightTwoElementInGrid
                  : width < 1200 && width > 599
                  ? secondDefaultBlockHeight
                  : width < 600
                  ? thirdDefaultBlockHeight
                  : firstDefaultBlockHeight,
                width: '100%',
                backgroundColor: '#CFD1DC',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                margin: 0,
              }}
            >
              <img style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={props.img} alt="" />
              <figcaption>
                <DescriptionText>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{
                      height: '100%',
                      maxHeight: 'calc(100% - 55px)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <div className="lineClamp__cardShortDesc">{props.shortDescription}</div>
                  </Grid>
                  <ArrowIconWrapper>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 26.9995L27 0.999667M27 0.999667L27 28.0005M27 0.999667L13.5001 0.999999L3.89473e-05 1.00045"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </ArrowIconWrapper>
                </DescriptionText>
              </figcaption>
            </figure>
          </Grid>
          <Grid container style={{ gap: 10 }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item className={classes.dateText}>
                {formattedDateLetters}
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
            <Grid container className={classes.titleText}>
              <div className="lineClamp__newsOnLanding_mobile">{props.title}</div>
            </Grid>
          </Grid>
        </Grid>
      </Tooltip>

      <ShownFullscreenPostContent
        id={props.id}
        date={dateToShow}
        title={props.title}
        img={props.img}
        article={props.article}
        onImage={false}
        open={openFullscreenModal}
        isOwner={props.isOwner}
        handleOpenClose={() => setOpenFullscreenModal(!openFullscreenModal)}
        ownerId={props.workerId}
        firstname={props.firstname}
        lastname={props.lastname}
        ownerAvatar={props.ownerAvatar}
        // refetch={props.refetch}
      />
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

export default ProfileNewsBlock;
