import React from 'react';
import { Grid, Skeleton, Box } from '@mui/material';

const SkeletonEvents = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', marginBottom: 1 }}>
          <Box sx={{ width: '60%', margin: 1 }}>
            <Skeleton animation="wave" variant="rectangular" width="100%" style={{ marginTop: 10 }}>
              <div style={{ paddingTop: '37%' }} />
            </Skeleton>
          </Box>
          <Box sx={{ width: '40%', padding: 1 }}>
            <Skeleton animation="wave" height={30} width="95%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="55%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="85%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="65%" style={{ marginBottom: 6, marginTop: 60 }} />
            <Skeleton animation="wave" height={15} width="65%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="65%" style={{ marginBottom: 6, marginTop: 6 }} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', marginBottom: 1 }}>
          <Box sx={{ width: '60%', margin: 1 }}>
            <Skeleton animation="wave" variant="rectangular" width="100%" style={{ marginTop: 10 }}>
              <div style={{ paddingTop: '37%' }} />
            </Skeleton>
          </Box>
          <Box sx={{ width: '40%', padding: 1 }}>
            <Skeleton animation="wave" height={30} width="95%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="55%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="85%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="65%" style={{ marginBottom: 6, marginTop: 60 }} />
            <Skeleton animation="wave" height={15} width="65%" style={{ marginBottom: 6, marginTop: 6 }} />
            <Skeleton animation="wave" height={15} width="65%" style={{ marginBottom: 6, marginTop: 6 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SkeletonEvents;
