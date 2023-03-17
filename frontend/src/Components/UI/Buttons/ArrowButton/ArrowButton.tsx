import React, { useState } from 'react';

import Grid from '@mui/material/Grid';

import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import { useHistory } from 'react-router-dom';

import { ArrowButtonProps } from './typing';

const ArrowButton: (props: ArrowButtonProps) => JSX.Element = (props: ArrowButtonProps) => {
  const history = useHistory();
  const [hover, setHover] = useState(false);

  return (
    <Grid
      item
      direction="row"
      style={{
        cursor: 'pointer',
        textTransform: 'uppercase',
      }}
      className={props.className}
      onMouseOver={(): void => setHover(true)}
      onMouseOut={(): void => setHover(false)}
    >
      <Grid
        container
        alignItems="center"
        style={{
          transition: 'all 0.5s ease',
          textDecoration: hover ? 'underline' : 'none',
          fontSize: 'clamp(0.5rem, 0.5250rem + 1.0000vw, 1.125rem)',
        }}
        onClick={props.onClick}
      >
        <div
          style={{
            fontWeight: 500,
          }}
        >
          {props.text}
        </div>
        <HiOutlineArrowNarrowRight style={{ marginLeft: 5, fontSize: 'clamp(1rem, 0.3438rem + 2.9167vw, 1.875rem)' }} />
      </Grid>
    </Grid>
  );
};

export default ArrowButton;
