import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navbar: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '40px 0',
    '@media (max-width: 1200px)': {
      margin: '35px 0 25px 0',
    },
    '@media (max-width: 600px)': {
      margin: 'auto',
    },
  },

  navbarFooter: {
    background: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },

  linkName: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 24,
    lineHeight: '100%',
    textTransform: 'capitalize',
    fontWeight: 600,
    '@media (max-width: 600px)': {
      fontWeight: 500,
    },
  },

  linkNameFooter: {
    color: '#252525',
    textDecoration: 'none',
    fontSize: 24,
    lineHeight: '100%',
    textTransform: 'capitalize',
    fontWeight: 600,
  },

  link: {
    color: 'white',
    textDecoration: 'none',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'capitalize',
  },

  projectLink: {
    color: '#252525',
    textDecoration: 'none',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'capitalize',
  },

  linkFooter: {
    color: '#252525',
    textDecoration: 'none',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'capitalize',
  },

  linkFooterText: {
    color: '#252525',
    textDecoration: 'none',
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'capitalize',
  },

  menuItemLinkText: {
    color: '#252525',
    textDecoration: 'none',
    paddingLeft: 20,
    fontSize: 18,
    lineHeight: '100%',
  },
}));

export default useStyles;
