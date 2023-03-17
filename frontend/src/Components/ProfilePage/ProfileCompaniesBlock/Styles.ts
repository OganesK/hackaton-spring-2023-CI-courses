import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18, MobileFS20, MobileFS24 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  companyTitleText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    '@media (max-width: 600px)': {
      fontSize: MobileFS24,
    },
  },

  companyDescText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    fontWeight: 300,
  },

  companyDateText: {
    color: '#AAADB2',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 300,
    '@media (max-width: 600px)': {
      fontSize: MobileFS20,
    },
  },
  activity: {
    color: '#FF5631',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    '@media (max-width: 600px)': {
      fontSize: MobileFS20,
    },
  },
}));

export default useStyles;
