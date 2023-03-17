import React from 'react';
import { Grid, Skeleton, Box, Avatar } from '@mui/material';

const SkeletonOffers = () => {
  return (
    <Grid container columnSpacing={6}>
      <Grid item xs={8}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="30%" />
            <Skeleton animation="wave" height={10} width="20%" />
          </Box>
        </Box>
        <Skeleton animation="wave" height={30} width="95%" style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={15} width="85%" />
        <Skeleton animation="wave" variant="rectangular" width="100%" style={{ marginTop: 10 }}>
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
      </Grid>
      <Grid item xs={8} style={{ marginTop: 80 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ margin: 1 }}>
            <Skeleton animation="wave" variant="circular">
              <Avatar />
            </Skeleton>
          </Box>
          <Box sx={{ width: '100%', padding: 1, display: 'grid', gap: 1 }}>
            <Skeleton animation="wave" height={12} width="30%" />
            <Skeleton animation="wave" height={10} width="20%" />
          </Box>
        </Box>
        <Skeleton animation="wave" height={30} width="95%" style={{ marginBottom: 6, marginTop: 6 }} />
        <Skeleton animation="wave" height={15} width="85%" />
        <Skeleton animation="wave" variant="rectangular" width="100%" style={{ marginTop: 10 }}>
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
      </Grid>
    </Grid>
  );
};

export default SkeletonOffers;
