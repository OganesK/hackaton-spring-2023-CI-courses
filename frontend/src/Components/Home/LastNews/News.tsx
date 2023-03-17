import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import ShownFullscreenPostContent from '../../UI/Modal/ShownFullscreenPostContent';
import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import '../../UI/Styles/CSS/Components/style.css';

import useStyles from './Styles';

import { useWindowSize } from '../../../rules/index';

import { NewsProps } from './typing';

const News: (props: NewsProps) => JSX.Element = (props: NewsProps) => {
  const classes = useStyles();
  const [openFullscreenModal, setOpenFullscreenModal] = useState(false);

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 6.5;
  const secondDefaultBlockHeight = width / 4;
  const thirdDefaultBlockHeight = width / 2;

  const formattedDate = new Date(props.date).toLocaleString().slice(0, -3);
  const dateToShow: string = formattedDate.slice(0, 10);
  const formattedDateLetters = new Date(props.date)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString();

  const fullscreenModalHandler = () => {
    if (openFullscreenModal) {
      setOpenFullscreenModal(!openFullscreenModal);
    } else {
      setOpenFullscreenModal(!openFullscreenModal);
    }
  };

  return (
    <Grid
      container
      xl={4}
      lg
      md
      sm
      xs={12}
      direction="row"
      justifyContent="space-between"
      className={classes.lastNewsContainer}
    >
      <Grid container direction="column" xs={12}>
        <Grid
          item
          className={classes.imageLastNewsContainer}
          style={{
            backgroundImage: `url(${props.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height:
              width < 1280 && width > 599
                ? secondDefaultBlockHeight
                : width < 600
                ? thirdDefaultBlockHeight
                : firstDefaultBlockHeight,
          }}
        />
        <Grid container direction="column" style={{ gap: 6 }}>
          <Grid className={classes.headerTextLastNews}>
            <div className={width < 600 ? 'lineClamp__newsOnLanding_mobile' : 'lineClamp__newsOnLanding'}>
              {props.headline}
            </div>
          </Grid>
          <Grid className={classes.dateTextLastNews}>{formattedDateLetters}</Grid>
        </Grid>
        <Grid className={classes.titleTextLastNews}>
          <div className={width < 600 ? 'lineClamp__newsOnLanding_mobile' : 'lineClamp__newsOnLanding_desc'}>
            {props.shortDescription}
          </div>
        </Grid>
      </Grid>
      <Grid
        style={{
          marginTop: width < 600 ? 0 : 20,
        }}
      >
        <ArrowButton
          onClick={fullscreenModalHandler}
          text={width < 500 ? 'Открыть' : 'Открыть описание'}
          className={classes.colorLinkNews}
        />
      </Grid>
      <ShownFullscreenPostContent
        id={1}
        date={dateToShow}
        title={props.headline}
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
    </Grid>
  );
};

export default News;
