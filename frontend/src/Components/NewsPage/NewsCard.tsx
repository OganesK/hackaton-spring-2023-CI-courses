/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import { useWindowSize } from '../../rules/index';

import useStyles, { ArrowIconWrapper, DescriptionText } from '../ProfilePage/ProfileNewsBlock/Styles';

import ShownFullscreenPostContent from '../UI/Modal/ShownFullscreenPostContent';
import '../UI/Styles/CSS/Components/posterAnimation.css';

import { NewsCardProps } from './typing';

const NewsCard: (props: NewsCardProps) => JSX.Element = (props: NewsCardProps) => {
  const classes = useStyles();
  const [width] = useWindowSize();

  const [openFullscreenModal, setOpenFullscreenModal] = useState(false);

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
  const formattedDateLetters = new Date(props.createdAt)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString();

  const firstDefaultBlockHeight = width / 6;
  const secondDefaultBlockHeight = width / 4;
  const thirdDefaultBlockHeight = width / 2;

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
              height:
                width < 1280 && width > 599
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
              </DescriptionText>
            </figcaption>
          </figure>
        </Grid>
        <Grid container className={classes.dateText}>
          {formattedDateLetters}
        </Grid>
        <Grid container className={classes.titleText}>
          {props.title}
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

export default NewsCard;
