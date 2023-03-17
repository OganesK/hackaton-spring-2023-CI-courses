import React from 'react';
import { Grid, Skeleton } from '@mui/material';

import { useWindowSize } from '../../../../rules/index';

const SkeletonResources = () => {
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = (width - width / 4.5) / 3.2;
  const secondDefaultBlockHeight = width / 2;

  return (
    <Grid container columnSpacing={6}>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={width < 600 ? secondDefaultBlockHeight : firstDefaultBlockHeight}
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </Grid>
      <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={width < 600 ? secondDefaultBlockHeight : firstDefaultBlockHeight}
        />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </Grid>
    </Grid>
  );
};

export default SkeletonResources;
