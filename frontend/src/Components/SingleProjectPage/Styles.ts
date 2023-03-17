import { makeStyles } from '@material-ui/core/styles';
import { FS16, FS18, FS24, FS72, sideBarFS18, MobileFS24, MobileFS48, lineHeightFS86 } from '../../rules/index';

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
    marginBottom: 10,
  },

  GridMobileLink: {},

  link: {
    color: '#252525',
    textDecoration: 'none',
    fontSize: sideBarFS18,
    lineHeight: '130%',
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
    textAlign: 'center',
    cursor: 'pointer',
  },

  workerName: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS24,
    lineHeight: '140%',
    '@media (max-width:960px)': {
      fontSize: MobileFS24,
    },
  },

  positionText: {
    color: '#252525',
    fontSize: FS16,
    lineHeight: '130%',
    '@media (max-width:960px)': {
      fontSize: MobileFS24,
      lineHeight: '140%',
      color: '#AAADB2',
    },
  },
  headerParticipantsList: {
    color: '#252525',
    fontWeight: 500,
    // textTransform: 'uppercase',
    fontSize: FS18,
  },

  messageButton: {
    padding: '16px 66px',
    width: '100%',
  },

  sliderNoSlidesThumb: {
    // borderTop: '1px solid #CFD1DC',
    // borderBottom: '1px solid #CFD1DC',
    gap: 60,
    height: '40vh',
  },

  textEmptyBlock: {
    fontWeight: 400,
    fontSize: FS24,
    lineHeight: '120%',
    textAlign: 'center',
  },

  imgContainerNoSlides: {
    maxWidth: 360,
    minWidth: 150,
    height: 200,
    minHeight: 90,
    border: '1px dashed #CFD1DC',
    cursor: 'pointer',
  },

  imgNoSlides: {
    height: 70,
    width: 70,
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },

  textHeader: {
    color: '#252525',
    fontSize: FS72,
    lineHeight: lineHeightFS86,
    '@media (max-width:960px)': {
      fontSize: MobileFS48,
      lineHeight: '116%',
    },
  },
}));

export default useStyles;
