import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid } from '@mui/material';

import { useWindowSize } from '../../../rules/index';

import crowdCardArrowIcon from '../../../assets/icons/crowdCardArrow.svg';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import '../../UI/Styles/CSS/Components/display.css';

import useStyles from './Styles';

import { CrowdfundingCardProps } from './typing';

const CrowdfundingCard: (props: CrowdfundingCardProps) => JSX.Element = (props: CrowdfundingCardProps) => {
  const classes = useStyles();
  const history = useHistory();

  const percentSum = (props.nowSum * 100) / props.goalSum;

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = (width - width / 4.5) / 3.2;
  const secondDefaultBlockHeight = width / 2;
  const [hover, setHover] = useState(false);

  const goToProjectHandler = () => {
    history.push(`/projects/project/${props.projectProps.id}#crowdfunding`);
  };

  return (
    <Grid
      item
      container
      style={{
        wordBreak: 'break-word',
        marginBottom: 10,
      }}
    >
      <Grid container>
        <div className={classes.glass}>
          <div className={classes.progress} style={{ width: `${percentSum}%` }} />
        </div>
      </Grid>
      <Grid
        container
        style={{
          backgroundColor: '#fff',
          border: '1px solid #CFD1DC',
          borderTop: '0px solid',
          transition: 'all 0.5s linear',
          cursor: 'pointer',
        }}
        className="Message"
        onMouseOver={(): void => setHover(true)}
        onMouseOut={(): void => setHover(false)}
        onClick={goToProjectHandler}
      >
        <div className="ShowOnHover">
          <Grid
            style={{
              height: width < 961 ? secondDefaultBlockHeight : firstDefaultBlockHeight,
              width: '100%',
              backgroundColor: '#CFD1DC',
              backgroundImage: `url(${props.projectProps.poster.link})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              margin: 0,
              // opacity: hover ? 1 : 0,
              // transition: 'opacity 0.5s linear',
              // display: hover ? 'block' : 'none',
            }}
          >
            <Grid container direction="column" className={classes.cardContainerHover}>
              <Grid item className={classes.goToText}>
                Перейти к проекту
              </Grid>
              <Grid item className={classes.projectName}>
                <div className={width < 600 ? 'lineClamp__default__header' : 'lineClamp__default__description'}>
                  {props.projectProps.name}
                </div>
              </Grid>
              <Grid item style={{ marginTop: 10 }}>
                <img src={crowdCardArrowIcon} />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            className={classes.helpButton}
            style={{
              backgroundColor: hover ? '#252525' : '#fff',
              color: hover ? '#fff' : '#252525',
              transition: 'all 0.5s linear',
            }}
          >
            Помочь проекту
          </Grid>
        </div>

        <div className="Show">
          <Grid
            style={{
              height: width < 961 ? secondDefaultBlockHeight : firstDefaultBlockHeight,
              width: '100%',
              backgroundColor: '#fff',
              margin: 0,
              // opacity: hover ? 0 : 1,
              // transition: 'opacity 0.5s linear',
            }}
          >
            <Grid
              container
              alignItems="space-between"
              style={{
                gap: 20,
              }}
              className={classes.cardContainer}
            >
              <Grid
                container
                direction="column"
                style={{
                  gap: 12,
                }}
              >
                <Grid item className={classes.crowdProjectName}>
                  <div className="lineClamp__1">{props.projectProps.name}</div>
                </Grid>
                <Grid item className={classes.crowdName}>
                  <div className={width < 1600 ? 'lineClamp__1' : 'lineClamp__3'}>{props.title}</div>
                </Grid>
                <Grid item className={classes.crowdDescription}>
                  <div className={width < 1600 ? 'lineClamp__2' : 'lineClamp__3'}>{props.shortDescription}</div>
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="flex-end"
                justifyContent="space-between"
                style={{ display: width < 450 ? 'none' : '' }}
              >
                <Grid item>
                  <Grid container direction="column" style={{ gap: 5 }}>
                    <Grid item container alignItems="center" className={classes.sumHeader}>
                      {props.nowSum.toLocaleString()}
                      <CurrencyRubleIcon
                        sx={{
                          fontWeight: 500,
                          fontSize: 24,
                          lineHeight: '120%',
                          color: '#252525',
                        }}
                      />
                    </Grid>
                    <Grid item className={classes.sumText}>
                      Собрано
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" style={{ gap: 5 }}>
                    <Grid item container alignItems="center" className={classes.sumHeader}>
                      {props.goalSum.toLocaleString()}
                      <CurrencyRubleIcon
                        sx={{
                          fontWeight: 500,
                          fontSize: 24,
                          lineHeight: '120%',
                          color: '#252525',
                        }}
                      />
                    </Grid>
                    <Grid item className={classes.sumText} style={{ textAlign: 'end' }}>
                      Цель
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            className={classes.helpButton}
            style={{
              backgroundColor: hover ? '#252525' : '#fff',
              color: hover ? '#fff' : '#252525',
              transition: 'all 0.5s linear',
            }}
          >
            Помочь проекту
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default CrowdfundingCard;
