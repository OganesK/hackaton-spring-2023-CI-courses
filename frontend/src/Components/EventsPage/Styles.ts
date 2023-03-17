import { makeStyles } from '@material-ui/core/styles';
import { FS18 } from '../../rules/index';

const useStyles = makeStyles(theme => ({
  carouselFilling: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
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

  GridMobileLink: {},

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
    color: '#fff',
    paddingTop: 30,
  },

  newsBox: {
    padding: '10px 0 10px 0',
    gap: 15,
  },

  deleteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },

  sliderNavButton: {},

  projectDescriptionTitle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 400,
    marginTop: 20,
    textTransform: 'none',
  },

  containerParticipants: {
    borderBottom: '1.2px solid #d8dce2',
    padding: '10px 15px',
  },

  titleParticipantsList: {
    color: '#252525',
    fontWeight: 300,
    fontSize: FS18,
  },
  headerParticipantsList: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS18,
  },
}));

export default useStyles;
