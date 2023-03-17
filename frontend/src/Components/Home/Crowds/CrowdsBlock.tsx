import React from 'react';
import Grid from '@mui/material/Grid';

import ComponentTextHeader from '../ComponentTextHeader/ComponentTextHeader';
import CrowdfundingCard from '../../CrowdsPage/CrowdfundingCard/CrowdfundingCard';

import { useWindowSize } from '../../../rules/index';

import { CrowdsProps, CrowdsTypes } from './typing';

const CrowdsBlock: (props: CrowdsProps) => JSX.Element = (props: CrowdsProps) => {
  const [width] = useWindowSize();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      style={{ gap: width < 600 ? 20 : width < 961 ? 30 : 60 }}
    >
      <ComponentTextHeader text="Краудфандинг" />
      <Grid container justifyContent="space-between" columnSpacing={6}>
        {props.crowdsOnLanding &&
          props.crowdsOnLanding.map((crowd: CrowdsTypes) => (
            <Grid key={crowd.id} item container justifyContent="space-between" xs={width < 961 ? 12 : 6}>
              <CrowdfundingCard
                key={crowd.id}
                id={crowd.id}
                title={crowd.title}
                shortDescription={crowd.shortDescription}
                projectProps={crowd.project}
                goalSum={crowd.goalSum}
                nowSum={crowd.nowSum}
                activeCheck={crowd.activeCheck}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default CrowdsBlock;
