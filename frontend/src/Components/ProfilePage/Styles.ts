import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18, FS24 } from '../../rules/index';

const useStyles = makeStyles(theme => ({
  carouselFilling: {
    display: 'block',
    width: '100%',
    height: 'auto',
    objectFit: 'scale-down',
  },

  leftSideMenuComponent: {
    textTransform: 'uppercase',
    fontSize: FS18,
    lineHeight: '100%',
    color: '#fff',
  },

  leftMenu: {
    textTransform: 'uppercase',
    position: 'fixed',
  },

  GridLink: {
    width: '100%',
    marginBottom: 24,
  },

  link: {
    color: '#252525',
    textDecoration: 'none',
    fontSize: FS18,
    lineHeight: '100%',
    textTransform: 'uppercase',
    textAlign: 'left',
  },

  activeLink: {
    color: '#FF5631',
  },

  colorLink: {
    color: '#252525',
    paddingTop: 30,
  },

  announceBox: {
    padding: '10px 0 10px 0',
  },

  announce: {
    gap: 15,
  },

  announceImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },

  announceDescription: {
    // paddingLeft: 60,
    // width: 660,
  },

  announceDescriptionHeader: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    fontWeight: 500,
  },

  announceDescriptionDate: {
    color: '#AAADB2',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 300,
  },

  announceDescriptionTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    fontWeight: 400,
  },

  articleImage: {
    width: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

export default useStyles;
