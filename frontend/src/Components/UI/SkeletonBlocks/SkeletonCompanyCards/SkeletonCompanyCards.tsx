import React from 'react';

import { Grid, Skeleton, Box, Avatar } from '@mui/material';

const SkeletonCompanyCards = () => {
  return (
    <Grid container columnSpacing={6}>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="60%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </Box>
        </Box>
        <Grid container direction="row" justifyContent="flex-end">
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
          <Skeleton animation="wave" height={15} width="93%" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SkeletonCompanyCards;
