import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import { ButtonProps } from './typing';

const Button: (props: ButtonProps) => JSX.Element = (props: ButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={props.onClickEvent ? props.onClickEvent : props.onClick}
      disabled={props.isDisable ? true : false}
      style={{
        fontSize: 18,
        lineHeight: '130%',
        textTransform: props.isTextTransformNone ? 'none' : 'uppercase',
        transition: 'all 0.5s ease',
        border:
          (hover && props.isCancel) || (hover && props.onImage)
            ? '1px solid #FF5631'
            : hover && props.isNoneBorder
            ? 'none'
            : (hover && props.isWhite) || (hover && props.isHoverBorder)
            ? '1px solid #252525'
            : hover
            ? 'none'
            : props.isNoneBorder
            ? 'none'
            : props.isCancel || props.isWhite
            ? '1px solid #252525'
            : props.onImage || props.isBorder
            ? '1px solid #fff'
            : props.isOrangeBorder
            ? '1px solid #FF5631'
            : 'none',
        backgroundColor:
          hover && props.isEdit
            ? '#252525'
            : (hover && props.isOrange) || (hover && props.isHoverWhite)
            ? '#fff'
            : props.isDisable || (hover && props.isDisable)
            ? '#CFD1DC'
            : hover
            ? '#FF5631'
            : props.isCancel
            ? 'inherit'
            : props.onImage
            ? 'inherit'
            : props.isWhite
            ? '#ffffff'
            : props.isOrange
            ? '#FF5631'
            : '#252525',
        color:
          hover && props.isHoverTextWhite
            ? '#fff'
            : (hover && props.isOrange) || (hover && props.isHoverWhite)
            ? '#252525'
            : hover
            ? '#fff'
            : props.isCancel || props.isWhite
            ? '#252525'
            : props.onImage
            ? '#fff'
            : '#fff',
        cursor: props.isDisable ? 'default' : 'pointer',
      }}
      className={props.className} //передаются только значения высоты, ширины и внутренних отступов
      onMouseOver={(): void => setHover(true)}
      onMouseOut={(): void => setHover(false)}
      value={props.value ? props.value : ''}
    >
      <Grid container style={{ gap: 10 }} justifyContent="center">
        {props.isStartIcon ? <img src={props.icon} /> : null}
        {props.text}
      </Grid>
    </button>
  );
};

export default Button;
