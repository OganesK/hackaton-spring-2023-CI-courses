import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';

import ShownModalEventContent from '../../UI/Modal/ShownModalEventContent';
import Button from '../../UI/Buttons/OutlinedButton/Button';

import Line from '../../UI/Line/Line';
import { useWindowSize } from '../../../rules/index';
import { EventPosterProps } from '../typings';

import circleStream from '../../../assets/icons/circleStream.svg';
import useStyles from './Styles';

const EventPoster = (props: EventPosterProps) => {
  const classes = useStyles();
  const [openFullscreenEventModal, setOpenFullscreenEventModal] = useState(false);
  const [streamActive, setStreamActive] = useState(props.stream && props.stream.active ? true : false);

  const isOwner = props.user && props.user.publishedEvent.some(curr => curr.id === props.id);

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 5;
  const secondDefaultBlockHeight = width / 2.9;

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

  const fullscreenModalEventHandler = () => {
    if (openFullscreenEventModal) {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    } else {
      setOpenFullscreenEventModal(!openFullscreenEventModal);
    }
  };

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" className={classes.event}>
        <Grid container direction="row">
          <Grid container xl={7} lg={7} md={12} sm={12} xs={12}>
            <Grid
              container
              xs
              className={classes.eventImage}
              style={{
                backgroundImage: `url(${props.poster?.link})`,
                height: width > 1279 ? firstDefaultBlockHeight : secondDefaultBlockHeight,
              }}
            >
              {props.stream && streamActive ? (
                <Grid item className={classes.streamActivePart}>
                  <Grid container alignItems="center" style={{ gap: 15 }}>
                    <img src={circleStream} />
                    Идет прямая трансляция
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            xl
            lg
            md={12}
            sm={12}
            xs={12}
            className={classes.eventDescription}
            style={{
              gap: width < 1280 ? 12 : 12,
              paddingLeft: width < 1280 ? 0 : 50,
              paddingTop: width < 1280 ? 30 : 0,
            }}
          >
            <Grid container className={classes.eventDescriptionHeader}>
              {props.name}
            </Grid>

            <Grid container className={classes.organizerText}>
              {props.organizer}
            </Grid>

            <Grid container className={classes.eventDescriptionTitle}>
              {props.shortDescription}
            </Grid>
            <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
              <Grid container xs={4} className={classes.eventInfoTitle}>
                Тема
              </Grid>

              <Grid container xs className={classes.eventInfoText}>
                {props.theme}
              </Grid>
            </Grid>
            <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
              <Grid container xs={4} className={classes.eventInfoTitle}>
                Дата
              </Grid>

              <Grid container xs className={classes.eventInfoText}>
                {formattedDateLetters}&emsp;
                {timeToShow}
              </Grid>
            </Grid>
            {props.format ? (
              <Grid container direction={width < 1280 ? 'row' : 'row'} style={{ gap: 5 }}>
                <Grid container xs={4} className={classes.eventInfoTitle}>
                  Формат
                </Grid>
                <Grid container xs className={classes.eventInfoText}>
                  {props.format}
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Button
            onClick={fullscreenModalEventHandler}
            onImage={false}
            isCancel={true}
            text="Узнать подробнее"
            className={classes.modalButton}
          />
        </Grid>
        <ShownModalEventContent
          id={props.id}
          date={props.date}
          time={timeToShow}
          header={props.name}
          img={props.poster?.link}
          article={props.description}
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
      </Grid>
      <Line />
    </>
  );
};

export default EventPoster;
