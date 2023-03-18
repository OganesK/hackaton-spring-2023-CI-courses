/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Grid } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import {
  useTranslateStages,
  useTranslateInvestmentsStages,
  useTranslateSalesTypes,
} from '../../../helpers/hooks/useTranslateProjectProps';
import useStyles from './Styles';
import globalStyles from '../../UI/Styles/TS/TextStyles/style';
import { ProgressComponentTypes } from './typing';

const ProgressComponent: (props: ProgressComponentTypes) => JSX.Element = (props: ProgressComponentTypes) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const classes = useStyles();
  const styles = globalStyles();
  let percentStage = 0;
  let percentInvestments = 0;
  let percentSales = 0;
  {
    props.projectStagesValue && props.projectStagesValue === 'ideaOrConcept'
      ? (percentStage = 25)
      : props.projectStagesValue === 'prototypeOrMVP'
      ? (percentStage = 50)
      : props.projectStagesValue === 'workingProduct'
      ? (percentStage = 75)
      : props.projectStagesValue === 'scaling'
      ? (percentStage = 100)
      : (percentStage = 0);
  }

  {
    props.projectInvestmentsStagesValue && props.projectInvestmentsStagesValue === 'ownInvestments'
      ? (percentInvestments = 12.5)
      : props.projectInvestmentsStagesValue === 'governmentSubsidies'
      ? (percentInvestments = 25)
      : props.projectInvestmentsStagesValue === 'angels'
      ? (percentInvestments = 37.5)
      : props.projectInvestmentsStagesValue === 'preSeed'
      ? (percentInvestments = 50)
      : props.projectInvestmentsStagesValue === 'seed'
      ? (percentInvestments = 62.5)
      : props.projectInvestmentsStagesValue === 'stageA'
      ? (percentInvestments = 75)
      : props.projectInvestmentsStagesValue === 'stageB'
      ? (percentInvestments = 87.5)
      : props.projectInvestmentsStagesValue === 'stageC'
      ? (percentInvestments = 100)
      : (percentInvestments = 0);
  }

  {
    props.projectSalesTypesValue && props.projectSalesTypesValue === 'noSales'
      ? (percentSales = 0)
      : props.projectSalesTypesValue === 'firstSales'
      ? (percentSales = 50)
      : props.projectSalesTypesValue === 'systemSales'
      ? (percentSales = 100)
      : (percentSales = 0);
  }

  return (
    <Grid container direction="column" style={{ gap: 12 }}>
      <Grid item className={styles.stageHeader}>
        {props.projectStagesValue
          ? 'Стадия курса'
          : props.projectInvestmentsStagesValue
          ? 'Стадия инвестирования'
          : props.projectSalesTypesValue
          ? 'Уровень продаж'
          : null}
      </Grid>
      <Grid item className={styles.stageTitle} style={{ paddingBottom: isTabletOrMobile ? 0 : 15 }}>
        {props.projectStagesValue
          ? useTranslateStages(props.projectStagesValue)
          : props.projectInvestmentsStagesValue
          ? useTranslateInvestmentsStages(props.projectInvestmentsStagesValue)
          : props.projectSalesTypesValue
          ? useTranslateSalesTypes(props.projectSalesTypesValue)
          : null}
      </Grid>

      <Grid item className={classes.glass}>
        <div
          className={classes.progress}
          style={{
            width: props.projectStagesValue
              ? `${percentStage}%`
              : props.projectInvestmentsStagesValue
              ? `${percentInvestments}%`
              : props.projectSalesTypesValue
              ? `${percentSales}%`
              : 0,
            backgroundColor: '#252525',
          }}
        >
          <Grid
            item
            className={classes.progressPercent}
            style={{
              mixBlendMode:
                (percentStage && percentStage < 2) ||
                (percentInvestments && percentInvestments < 2) ||
                (percentSales && percentSales < 2)
                  ? 'difference'
                  : 'normal',
            }}
          >
            {props.projectStagesValue && props.projectStagesValue === 'ideaOrConcept'
              ? '1/4'
              : props.projectStagesValue === 'prototypeOrMVP'
              ? '2/4'
              : props.projectStagesValue === 'workingProduct'
              ? '3/4'
              : props.projectStagesValue === 'scaling'
              ? '4/4'
              : null}

            {props.projectInvestmentsStagesValue && props.projectInvestmentsStagesValue === 'ownInvestments'
              ? '1/8'
              : props.projectInvestmentsStagesValue === 'governmentSubsidies'
              ? '2/8'
              : props.projectInvestmentsStagesValue === 'angels'
              ? '3/8'
              : props.projectInvestmentsStagesValue === 'preSeed'
              ? '4/8'
              : props.projectInvestmentsStagesValue === 'seed'
              ? '5/8'
              : props.projectInvestmentsStagesValue === 'stageA'
              ? '6/8'
              : props.projectInvestmentsStagesValue === 'stageB'
              ? '7/8'
              : props.projectInvestmentsStagesValue === 'stageC'
              ? '8/8'
              : null}

            {props.projectSalesTypesValue && props.projectSalesTypesValue === 'noSales'
              ? '1/3'
              : props.projectSalesTypesValue === 'firstSales'
              ? '2/3'
              : props.projectSalesTypesValue === 'systemSales'
              ? '3/3'
              : null}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgressComponent;
