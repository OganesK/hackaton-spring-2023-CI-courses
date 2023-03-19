import React from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../rules/index';
import '../../Components/UI/Styles/CSS/Components/posterAnimation.css'

import useStyles, { ArrowIconWrapper, DescriptionText } from './Styles';

import { useTranslate } from '../../helpers/hooks/useTranslateCategories';

import { ProjectCardProps } from './typing';

export default function TestXard(props: ProjectCardProps): JSX.Element {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 6;
  const secondDefaultBlockHeight = width / 4;
  const thirdDefaultBlockHeight = width / 2;


  const history = useHistory();

  const classes = useStyles();
  return (
    <div
      onClick={(): void => history.push(`/tests/${props.courseId}`)}
      style={{
        cursor: 'pointer',
      }}
    >
      <Grid
        className="hover-text-one"
        style={{
          backgroundColor:
            props.img && props.img !== 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg'
              ? 'inherit'
              : '#CFD1DC',
        }}
      >
        <figure
          className="effect-text-three"
          style={{
            height:
              width < 1200 && width > 599
                ? secondDefaultBlockHeight
                : width < 600
                ? thirdDefaultBlockHeight
                : firstDefaultBlockHeight,
            width: '100%',
            backgroundColor: '#CFD1DC',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            wordBreak: 'break-word',
            margin: 0,
          }}
        >
          <img style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={props.img} alt="" />
          <figcaption>
            <p className={classes.titleText}>{props.title}</p>
            <DescriptionText>
              <div
                style={{
                  height: '100%',
                  maxHeight: 'calc(100% - 55px)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {props.shortContent}
              </div>
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
    </div>
  );
}
