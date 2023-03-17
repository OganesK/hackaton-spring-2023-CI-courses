import React from 'react';
import Grid from '@material-ui/core/Grid';

import { NoneClickProps } from './typing';

const NoneClick: (props: NoneClickProps) => JSX.Element = (props: NoneClickProps) => {
  return (
    <Grid
      style={{
        background: 'transparent',
        position: 'absolute',
        cursor: 'progress',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  );
};

export default NoneClick;
