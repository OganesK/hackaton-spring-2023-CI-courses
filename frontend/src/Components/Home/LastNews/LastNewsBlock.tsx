import React from 'react';
import { Grid } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import ComponentTextHeader from '../ComponentTextHeader/ComponentTextHeader';
import News from './News';

import { useWindowSize } from '../../../rules/index';

import useStyles from './Styles';

import { LastNewsProps, NewsTypes } from './typing';

const LastNews: (props: LastNewsProps) => JSX.Element = (props: LastNewsProps) => {
  const history = useHistory();
  const [width] = useWindowSize();

  const onClickHandler: () => void = () => {
    history.push('/news');
  };
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      className={classes.lastNewsBox}
      style={{ gap: width < 600 ? 20 : width < 961 ? 30 : 50 }}
    >
      <Grid container xl lg md={12} sm={12} xs={12} direction="row">
        <Grid container lg={12} md={8} sm={8} xs={7}>
          <ComponentTextHeader text="уроки сообщества" />
        </Grid>
        <Grid
          container
          lg={12}
          md={4}
          sm={4}
          xs={5}
          alignItems={width < 1280 ? 'flex-start' : 'flex-end'}
          justifyContent={width < 1280 ? 'flex-end' : 'flex-start'}
        >
          <ArrowButton onClick={onClickHandler} text="Смотреть все" className={classes.colorLink} />
        </Grid>
      </Grid>
      {props.newsShownOnLanding &&
        props.newsShownOnLanding.map((news: NewsTypes) => (
          <News
            key={news.title}
            headline={news.title}
            date={news.createdAt}
            shortDescription={news.description}
            article={news.article}
            workerId={news.author.worker.id}
            firstname={news.author.worker.firstname}
            lastname={news.author.worker.lastname}
            ownerAvatar={news.author.worker.avatar.link}
            img={news.poster?.link}
          />
        ))}
    </Grid>
  );
};

export default LastNews;
