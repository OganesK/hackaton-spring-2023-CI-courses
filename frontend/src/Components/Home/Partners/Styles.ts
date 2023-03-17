import { makeStyles } from '@material-ui/core/styles';
import { FS18 } from '../../../rules/index';
import { styled as styledMUI } from '@mui/material/styles';
import { Grid } from '@material-ui/core';

export const Partners = styledMUI(Grid)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  position: relative;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 2px solid white;
  }
`;

const useStyles = makeStyles(() => ({
  partnersBox: {
    '@media (max-width: 1279px)': {
      gap: 40,
    },
  },

  partnerButton: {
    height: 80,
    backgroundColor: '#252525',
    fontSize: 18,
    lineHeight: '100%',
    color: '#fff',
    textTransform: 'uppercase',
    cursor: 'pointer',
    width: '100%',
  },
}));

export default useStyles;
