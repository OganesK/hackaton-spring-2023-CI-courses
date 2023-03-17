import { makeStyles } from '@material-ui/core/styles';
import { styled as styledMUI } from '@mui/material/styles';

import { FS18, FS24, FS48 } from '../../rules/index';

export const DescriptionText = styledMUI('div')`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: auto;
  transition: all 0.9s ease;
  padding: 15px 20px;
`;

export const ArrowIconWrapper = styledMUI('div')`
  position: absolute;
  right: 25px;
  bottom: 25px;
`;

const useStyles = makeStyles(() => ({
  dateText: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#fff',
    transition: 'all .3s ease',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 48.32%, rgba(0, 0, 0, 0) 100%)',
  },

  titleText: {
    fontSize: FS24,
    lineHeight: '130%',
    color: '#fff',
    transition: 'all .3s ease',
    background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 48.32%, rgba(0, 0, 0, 0) 100%)',
  },
}));

export default useStyles;
