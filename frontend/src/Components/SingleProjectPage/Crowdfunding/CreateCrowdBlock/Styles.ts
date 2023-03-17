import { makeStyles } from '@material-ui/core/styles';
import { FS18, FS48 } from '../../../../rules/index';

const useStyles = makeStyles(theme => ({
  bidBox: {
    padding: '70px 20px',
    minHeight: 300,
    background: '#252525',
    '@media (max-width: 960px)': {
      minHeight: 200,
    },
  },

  bidMobileBox: {
    padding: '40px',
    minHeight: 300,
    background: '#252525',
  },

  insideProjectBidBox: {
    minHeight: 300,
    background: '#252525',
    padding: '60px 40px',
    '@media (max-width: 1280px)': {
      minHeight: 200,
    },
    '@media (max-width: 960px)': {
      padding: 40,
    },
    '@media (max-width: 576px)': {
      minHeight: 130,
    },
  },

  header: {
    textTransform: 'uppercase',
    fontSize: FS48,
    lineHeight: '116%',
    color: '#fff',
    fontWeight: 500,
    maxWidth: 700,
  },

  landingHeader: {
    textTransform: 'uppercase',
    fontSize: FS48,
    lineHeight: '116%',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 500,
    maxWidth: 700,
  },

  article: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#fff',
    // textAlign: 'center',
  },

  bidButton: {
    padding: '26px 60px',
    // width: '30%',
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '@media (max-width: 1100px)': {
      padding: '13px 30px',
    },
    '@media (max-width: 960px)': {
      padding: '13px 30px',
    },
    '@media (max-width: 599px)': {
      padding: '6px 15px',
    },
  },

  bidButtonOnProject: {
    padding: '26px 54px',
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'uppercase',
    cursor: 'pointer',
    '@media (max-width: 960px)': {
      width: '100%',
    },
    '@media (max-width: 600px)': {
      padding: 'clamp(1rem, 0.6250rem + 1.6667vw, 1.625rem) 54px',
    },
  },

  bidMobileButton: {
    width: '100%',
    padding: '26px 0',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
}));

export default useStyles;
