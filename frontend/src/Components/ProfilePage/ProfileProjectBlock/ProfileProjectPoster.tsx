/*eslint-disable  @typescript-eslint/restrict-template-expressions*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
import React from 'react';
import { Grid, Tooltip } from '@mui/material';

import { useHistory } from 'react-router';

import { useWindowSize } from '../../../rules/index';

import useStyles, { ArrowIconWrapper, DescriptionText } from './Styles';

import '../../UI/Styles/CSS/Components/style.css';
import '../../UI/Styles/CSS/Components/posterAnimation.css';

import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

import { ProjectPosterProps } from './typing';

const ProfileProjectPoster: (props: ProjectPosterProps) => JSX.Element = (props: ProjectPosterProps) => {
  const classes = useStyles();
  const history = useHistory();

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 6;
  const secondDefaultBlockHeight = width / 4;
  const thirdDefaultBlockHeight = width / 2;

  const translateCategory = useTranslate(props.category);

  const getStringWhatUpdated = (): string => {
    if (!props.updatedVariable) return '';

    let tooltipTitle = 'В проекте произошли изменения:';
    if (props.updatedVariable.name) tooltipTitle += ' название,';
    if (props.updatedVariable.poster?.link) tooltipTitle += ' постер, ';
    if (props.updatedVariable.presentationMedia) tooltipTitle += ' медиа элементы,';
    if (tooltipTitle.endsWith(',')) tooltipTitle = tooltipTitle.slice(0, tooltipTitle.length - 1) + '.';
    return tooltipTitle;
  };

  return (
    <Tooltip
      title={
        props.isOwner && props.isApproved === false
          ? 'Проект находится на стадии модерации, только вы видите его. Доступно редактирование.'
          : ''
      }
    >
      <div>
        <Tooltip placement="top" title={props.isOwner ? getStringWhatUpdated() : ''}>
          <div
            onClick={() => {
              if (props.isApproved || props.isOwner) {
                history.push(`/projects/project/${props.projectId}`);
              }
            }}
            style={{
              filter: props.isApproved ? 'none' : 'brightness(0.6) opacity(0.8)',
              wordBreak: 'break-word',
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
                  margin: 0,
                }}
              >
                <img style={{ height: 'auto', width: '100%', objectFit: 'cover' }} src={props.img} alt="" />
                <figcaption>
                  <h3 className={classes.dateText}>{translateCategory}</h3>
                  <p className={classes.titleText}>
                    <div className="lineClamp__cardHeader">{props.header}</div>
                  </p>
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
          </div>
        </Tooltip>
      </div>
    </Tooltip>
  );
};

export default ProfileProjectPoster;
