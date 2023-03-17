import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function Item(props: BoxProps): JSX.Element {
  const { ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 1,
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '700',
      }}
      {...other}
      style={{}}
    />
  );
}

export default function EventCard(): JSX.Element {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        <Item>1</Item>
        <Item>2</Item>
      </Box>
    </div>
  );
}
