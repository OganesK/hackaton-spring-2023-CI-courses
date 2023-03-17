import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import { PartnerContainerProps } from './typing';

import useStyles from './Styles';

const PartnerContainer: (props: PartnerContainerProps) => JSX.Element = (props: PartnerContainerProps) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const onClickHandler: () => void = () => {
    window.open(props.link);
  };

  return (
    <Grid className={classes.partnersBox}>
      <Grid
        container
        xs={12}
        justifyContent="center"
        alignItems="center"
        className={classes.partnersContainer}
        style={{
          transform: hover ? 'scale(1.15)' : 'scale(1.0)',
        }}
        onMouseOver={(): void => setHover(true)}
        onMouseOut={(): void => setHover(false)}
        onClick={(): void => onClickHandler()}
      >
        <img src={props.img} className={classes.partnersImg} />
      </Grid>
    </Grid>
  );
};

export default PartnerContainer;
