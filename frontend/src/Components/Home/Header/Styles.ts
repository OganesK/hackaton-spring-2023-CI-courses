import { makeStyles } from '@material-ui/core/styles';
import { FS72, FS18 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  sloganImageBox: {
    backgroundColor: '#CFD1DC',
  },

  sloganTextContainer: {
    marginBottom: 50,
  },

  sloganText: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: FS72,
    lineHeight: 'clamp(4rem, -0.1250rem + 6.8750vw, 5.375rem)',
    letterSpacing: '-0.01em',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginTop: 'clamp(1.875rem, -0.4688rem + 10.4167vw, 5rem)',
    '@media (max-width: 960px)': {
      lineHeight: '116%',
    },
  },

  sloganTextDesc: {
    marginTop: 'clamp(1.875rem, -1.4063rem + 14.5833vw, 4rem)',
    fontSize: FS18,
    fontWeight: 400,
    lineHeight: '130%',
    color: '#fff',
  },

  colorLink: {
    color: '#fff',
    fontSize: FS18,
  },
}));

export default useStyles;
