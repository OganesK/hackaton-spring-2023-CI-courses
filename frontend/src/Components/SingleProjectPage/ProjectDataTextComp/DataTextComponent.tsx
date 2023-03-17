/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Grid } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import {
  useTranslateIndustrialDirections,
  useTranslateTypes,
  useTranslateTechTypes,
  useTranslateMainGoals,
} from '../../../helpers/hooks/useTranslateProjectProps';

import globalStyles from '../../UI/Styles/TS/TextStyles/style';
import { DataTextTypes } from './typing';

const DataTextComponent: (props: DataTextTypes) => JSX.Element = (props: DataTextTypes) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const styles = globalStyles();

  return (
    <Grid container direction="column" style={{ gap: 12 }}>
      <Grid item className={styles.stageHeader}>
        {props.projectTypesValue
          ? 'Тип'
          : props.projectIndustrialDirectionsValue
          ? 'Индустриальное направление'
          : props.projectMarketsValue
          ? 'Рынки'
          : props.projectTechTypesValue
          ? 'Сквозные технологии'
          : props.projectBusinessModelsValue
          ? 'Бизнес-модель'
          : props.projectMainGoalsValue
          ? 'Задачи'
          : null}
      </Grid>
      <Grid item className={styles.stageTitle} style={{ paddingBottom: isTabletOrMobile ? 0 : 15 }}>
        {props.projectTypesValue
          ? useTranslateTypes(props.projectTypesValue)
          : props.projectIndustrialDirectionsValue
          ? useTranslateIndustrialDirections(props.projectIndustrialDirectionsValue)
          : props.projectMarketsValue
          ? props.projectMarketsValue
          : props.projectTechTypesValue
          ? useTranslateTechTypes(props.projectTechTypesValue)
          : props.projectBusinessModelsValue
          ? props.projectBusinessModelsValue
          : props.projectMainGoalsValue
          ? useTranslateMainGoals(props.projectMainGoalsValue)
          : null}
      </Grid>
    </Grid>
  );
};

export default DataTextComponent;
