import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';

import ShownModalEventContent from '../UI/Modal/ShownModalEventContent';

import { useWindowSize } from '../../rules/index';
import { EventCardProps } from './graphql/typings';

import '../UI/Styles/CSS/Components/style.css';
import '../UI/Styles/CSS/Components/posterAnimation.css';

import circleStream from '../../assets/icons/circleStream.svg';

import useStyles, { ArrowIconWrapper, DescriptionResourceText } from './Styles';

const EventCard: (props: EventCardProps) => JSX.Element = (props: EventCardProps) => {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 5;
  const secondDefaultBlockHeight = width / 2.96;

  const classes = useStyles();
  const isOwner = props.user && props.user.publishedEvent.some(curr => curr.id === props.id);

  const [openFullscreenEventModal, setOpenFullscreenEventModal] = useState(false);

  const formattedDate = new Date(props.date).toLocaleString().slice(0, -3);
  const formattedDateLetters = new Date(props.date)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .toLocaleString()
    .slice(0, -8);
  const timeToShow: string = formattedDate.slice(12, formattedDate.length);

  const fullscreenModalEventHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openFullscreenEventModal) {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    } else {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    }
  };

  const [streamActive, setStreamActive] = useState(props.stream && props.stream.active ? true : false);

  return (
    <>
      <Grid
        className="hover-text-one"
        style={{
          backgroundColor:
            props.img && props.img.link !== 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg'
              ? 'inherit'
              : '#CFD1DC',
          cursor: 'pointer',
          marginBottom: 20,
        }}
        onClick={(e: React.MouseEvent) => fullscreenModalEventHandler(e)}
      >
        <figure
          className="effect-text-three"
          style={{
            height: width > 1200 ? firstDefaultBlockHeight : secondDefaultBlockHeight,
            width: '100%',
            backgroundColor: '#CFD1DC',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            margin: 0,
          }}
        >
          <img style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={props.img?.link} alt="" />
          <figcaption>
            <h3
              className={classes.dateText}
              style={{
                fontWeight: 400,
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid item>
                  {formattedDateLetters}&emsp;
                  {timeToShow}
                </Grid>
                {props.stream && streamActive ? (
                  <Grid item>
                    <Grid container alignItems="center" className={classes.streamActiveText}>
                      <CircleIcon fontSize={width < 961 ? 'small' : 'medium'} color="inherit" />
                      <Grid style={{ color: '#fff' }}>Идет прямая трансляция</Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </h3>
            <p
              className={classes.titleText}
              style={{
                paddingBottom: 40,
              }}
            >
              {props.title}
            </p>
            <DescriptionResourceText>
              <Grid container justifyContent="center" alignItems="center" className={classes.posterTextBlock}>
                {props.shortContent}
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
      <ShownModalEventContent
        id={props.id}
        date={props.date}
        time={timeToShow}
        header={props.title}
        img={props.img?.link}
        article={props.content}
        onImage={false}
        isEvent={true}
        isCancel={true}
        eventOrganizer={props.organizer}
        eventAddress={props.address}
        eventFormat={props.format}
        eventTheme={props.theme}
        open={openFullscreenEventModal}
        handleOpenClose={() => setOpenFullscreenEventModal(!openFullscreenEventModal)}
        stream={props.stream}
        user={props.user}
        isOwner={isOwner}
        refetch={props.refetch}
      />
    </>
  );
};

export default EventCard;
