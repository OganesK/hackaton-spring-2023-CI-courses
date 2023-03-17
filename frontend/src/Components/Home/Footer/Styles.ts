import { makeStyles } from '@material-ui/core/styles';
import { FS18, FS24 } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    marginTop: 200,
    '@media (max-width: 1199px)': {
      marginTop: 150,
    },
    '@media (max-width: 991px)': {
      marginTop: 100,
    },
    '@media (max-width: 767px)': {
      marginTop: 80,
    },
    '@media (max-width: 576px)': {
      marginTop: 35,
    },
  },

  footerContainer: {
    backgroundColor: 'white',
    margin: '60px 0 30px 0',
  },

  footerNavBar: {
    // border:'3px solid #252525',
  },

  footerInfo: {
    // border:'3px solid #252525',
    margin: 'auto',
    // paddingTop: 40,
  },

  footerContactsContainer: {
    gap: 16,
    '@media (max-width: 767px)': {
      gap: 30,
    },
  },

  footerHeaderTextContacts: {
    fontSize: 18,
    lineHeight: '130%',
    color: '#252525',
  },

  footerTitleTextContacts: {
    fontSize: 18,
    whiteSpace: 'normal',
    lineHeight: '100%',
    color: '#252525',
    gap: 8,
  },

  footerHeaderContacts: {
    fontSize: 24,
    lineHeight: '100%',
    color: '#252525',
    textTransform: 'uppercase',
    fontWeight: 500,
  },

  linkNameFooter: {
    color: '#252525',
    textDecoration: 'none',
    fontSize: 24,
    lineHeight: '100%',
    textTransform: 'capitalize',
    fontWeight: 600,
  },
}));

export default useStyles;
