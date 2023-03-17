import React, { useState } from 'react';

import { Grid, Avatar, Tooltip } from '@mui/material';

import { useHistory } from 'react-router';

import { useWindowSize } from '../../../rules/index';

import { ProfileCompaniesProps } from './typing';

import useStyles from './Styles';
import '../../UI/Styles/CSS/Components/style.css';

import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

const ProfileCompaniesBlock: (props: ProfileCompaniesProps) => JSX.Element = (props: ProfileCompaniesProps) => {
  const history = useHistory();
  const [hover, setHover] = useState(false);

  const [width] = useWindowSize();

  const classes = useStyles();

  const formattedDate = new Date(props.createdAt).toLocaleString().slice(0, -3);
  const dateToShow: string = formattedDate.slice(6, 10);

  const translateCategory = useTranslate(props.activityKind);

  return (
    <Tooltip
      title={
        props.isOwner && props.isApproved === false
          ? 'Компания находится на стадии модерации, только вы видите её. Доступно редактирование.'
          : ''
      }
    >
      <Grid
        container
        xl
        md
        sm
        xs
        direction="row"
        style={{
          border: '1px solid #CFD1DC',
          filter: props.isApproved ? 'none' : 'brightness(0.6) opacity(0.8)',
          cursor: 'pointer',
          padding: width < 961 ? 35 : '20px 20px 40px 20px',
          boxShadow: hover ? '0px 4px 8px rgba(0,0,0,0.25)' : '0px 0px 0px rgba(0,0,0,0.25)',
          transition: 'all 0.5s ease',
          wordBreak: 'break-word',
          backgroundColor: '#fff',
          maxWidth: width < 961 ? 520 : 360,
          minWidth: width < 370 ? 370 - (370 - width) : 360,
          minHeight: width < 961 ? 160 : 200,
        }}
        onClick={
          props.isApproved || props.isOwner
            ? (): void => history.push(`/company/${props.companyId}`)
            : (): void => {
                alert('Компания проходит модерацию, вы пока не можете взаимодействовать с ней');
              }
        }
        onMouseOver={(): void => setHover(true)}
        onMouseOut={(): void => setHover(false)}
      >
        {width < 961 ? (
          <Grid container direction="row" style={{ gap: 30 }} alignItems="center">
            <Grid container xs={3}>
              <Avatar alt="user" sx={{ width: '90px', height: '90px' }} src={props.avatar} />
            </Grid>
            <Grid container xs>
              <Grid item className={classes.companyTitleText} style={{ marginBottom: 10 }}>
                <div className="lineClamp__default__header">{props.title}</div>
              </Grid>
              <Grid container direction="row" justifyContent="space-between">
                <Grid container xs={10}>
                  <Grid className={classes.companyDateText}>На сайте с {dateToShow} г</Grid>
                  <Grid container className={classes.activity}>
                    <div className="lineClamp__default__header">{translateCategory}</div>
                  </Grid>
                </Grid>

                <Grid container xs={2} justifyContent="flex-end" style={{ margin: 'auto 0', width: 28 }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 26.9995L27 0.999667M27 0.999667L27 28.0005M27 0.999667L13.5001 0.999999L3.89473e-05 1.00045"
                      stroke="#252525"
                      strokeWidth="2"
                    />
                  </svg>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container alignItems="flex-start" style={{ gap: 20 }}>
              <Grid item>
                <Avatar alt="user" sx={{ width: '48px', height: '48px' }} src={props.avatar} />
              </Grid>

              <Grid item container direction="column" justifyContent="space-around" xs style={{ gap: 6 }}>
                <Grid className={classes.companyTitleText} style={{ border: '0px solid' }}>
                  <div className="lineClamp__default__header">{props.title}</div>
                </Grid>
                <Grid className={classes.companyDateText}>На сайте с {dateToShow} г</Grid>
              </Grid>
            </Grid>
            <Grid container style={{ marginLeft: 68, position: 'relative' }}>
              <Grid
                container
                // alignItems="flex-start"
                className={classes.companyDescText}
                style={{
                  position: 'absolute',
                  width: 200,
                  height: 50,
                  opacity: hover ? 1 : 0,
                  transition: 'all 0.5s ease',
                  top: 0,
                }}
              >
                <div className="lineClamp__default__description">{props.description}</div>
              </Grid>
              <Grid
                container
                // alignItems="flex-end"
                className={classes.activity}
                style={{
                  position: 'absolute',
                  width: 200,
                  height: 50,
                  opacity: hover ? 0 : 1,
                  transition: 'all 0.5s ease',
                  top: 0,
                }}
              >
                <div className="lineClamp__default__header">{translateCategory}</div>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Tooltip>
  );
};

export default ProfileCompaniesBlock;
