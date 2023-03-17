import { makeStyles } from '@material-ui/core/styles';
import { FS18, FS24, FS72, lineHeightFS86, MobileFS20, MobileFS24, MobileFS48 } from '../../rules/index';

const useStyles = makeStyles(() => ({
  box: {
    padding: '10px 0 10px 0',
  },

  textNameCompany: {
    fontSize: FS24,
    fontWeight: 500,
    color: '#FF5631',
    cursor: 'pointer',
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

  projectHeader: {
    margin: 'auto',
    wordBreak: 'break-word',
    gap: 20,
    '@media (max-width:960px)': {
      // marginTop: 30,
      gap: 0,
    },
  },
  projectHeaders: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  dataProjectHeader: {
    fontSize: MobileFS24,
    color: '#252525',
    lineHeight: '120%',
    fontWeight: 500,
  },

  navigationProjectHeader: {
    fontSize: MobileFS24,
    color: '#FF5631',
    textTransform: 'uppercase',
    lineHeight: '120%',
    fontWeight: 500,
    backgroundColor: '#fff',
    position: 'sticky',
    padding: '6px 0 5px 0',
    top: -1,
    zIndex: 10,
    minHeight: 48,
  },

  projectShortDescBox: {},

  projectShortDesc: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    textTransform: 'uppercase',
  },

  leftMenu: {
    textTransform: 'uppercase',
    position: 'fixed',
    // top: '70vh',
    width: '100%',
  },

  modalFrame: {
    width: '100%',
    // border: '1px solid'
    // height:'10%'
  },
  projectTechHeader: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'uppercase',
    fontWeight: 500,
  },

  projectTechTitle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
  },

  GridLink: {
    width: '100%',
    marginBottom: 24,
  },
  link: {
    color: '#AAADB2',
    textDecoration: 'none',
    fontSize: 18,
    lineHeight: '100%',
    textTransform: 'uppercase',
  },

  colorLink: {
    color: '#252525',
  },

  postNoPostsBox: {
    maxWidth: 380,
    gap: 40,
    margin: 'auto',
    // height: '40vh',
  },

  textEmptyBlock: {
    fontWeight: 400,
    fontSize: FS24,
    lineHeight: '120%',
    textAlign: 'center',
  },

  emptyButton: {
    padding: '15px 0',
    width: '100%',
  },

  headerParticipantsList: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS18,
  },

  headerMarkdownTextContainer: {
    padding: 10,
    gap: 20,
  },

  headerMarkdownText: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS24,
  },

  companyHeaders: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
}));

export default useStyles;
