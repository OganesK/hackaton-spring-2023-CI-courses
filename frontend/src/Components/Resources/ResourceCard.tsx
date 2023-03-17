/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import { Grid, Avatar } from '@mui/material';

import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { useWindowSize } from '../../rules/index';

import useStyles, { ArrowIconWrapper, DescriptionResourceText } from '../ProfilePage/ProfileResourceBlock/Styles';

import { ResourceCardProps } from './typing';

import ShownFullscreenPostContent from '../UI/Modal/ShownFullscreenPostContent';
import '../UI/Styles/CSS/Components/posterAnimation.css';

import { useTranslate } from '../../helpers/hooks/useTranslateCategories';

const ResourceCard: (props: ResourceCardProps) => JSX.Element = (props: ResourceCardProps) => {
  const classes = useStyles();
  const [width] = useWindowSize();

  const [openFullscreenModal, setOpenFullscreenModal] = useState(false);

  const translateCategory = useTranslate(props.category);

  const fullscreenModalHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openFullscreenModal) {
      setOpenFullscreenModal(!openFullscreenModal);
    } else {
      setOpenFullscreenModal(!openFullscreenModal);
    }
  };

  const formattedDate = new Date(props.createdAt).toLocaleString().slice(0, -3);
  const dateToShow: string = formattedDate.slice(0, 10);

  const firstDefaultBlockHeight = (width - width / 4.5) / 3.2;
  const secondDefaultBlockHeight = width / 4;

  return (
    <>
      <Grid
        item
        container
        style={{
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
              height: width < 600 ? secondDefaultBlockHeight : firstDefaultBlockHeight,
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
              <p
                className={classes.titleText}
                style={{
                  padding: 40,
                }}
              >
                {props.title}
              </p>
              <DescriptionResourceText>
                <Grid container justifyContent="center" alignItems="center" className={classes.posterTextBlock}>
                  {props.shortDescription}
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
              </DescriptionResourceText>
            </figcaption>
          </figure>
        </Grid>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Grid container direction="row" style={{ gap: 20 }}>
              <Avatar
                alt="user"
                sx={{
                  width: 48,
                  height: 48,
                }}
                src={props.ownerAvatar}
              />
              <Grid item>
                <Grid container direction="column" justifyContent="center" style={{ gap: 6 }}>
                  <Grid item className={classes.nameText}>
                    {props.firstname}&nbsp;{props.lastname}
                  </Grid>
                  <Grid item className={classes.categoryText}>
                    {translateCategory}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ShownFullscreenPostContent
        id={props.id}
        date={dateToShow}
        title={props.title}
        img={props.img}
        article={props.article}
        onImage={false}
        open={openFullscreenModal}
        ownerId={props.workerId}
        firstname={props.firstname}
        lastname={props.lastname}
        ownerAvatar={props.ownerAvatar}
        handleOpenClose={() => setOpenFullscreenModal(!openFullscreenModal)}
      />
    </>
  );
};

export default ResourceCard;
