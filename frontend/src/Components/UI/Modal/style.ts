import { makeStyles } from '@material-ui/core/styles';
import { FS18, FS48, MobileFS18, MobileFS24, MobileFS28 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  // Fullscreen modal event

  eventHeader: {
    color: '#fff',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    wordBreak: 'break-word',
    '@media (max-width: 960px)': {
      fontSize: MobileFS28,
      textTransform: 'capitalize',
    },
  },

  eventHeaderDate: {
    color: '#fff',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    wordBreak: 'break-word',
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    wordBreak: 'break-word',
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS18,
    lineHeight: '100%',
    fontWeight: 500,
    '@media (max-width: 960px)': {
      fontSize: MobileFS18,
    },
  },

  modalArticleHeader: {
    textTransform: 'uppercase',
    fontSize: FS18,
    color: '#252525',
    fontWeight: 500,
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
      color: '#FF5631',
    },
  },

  eventInfoTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 400,
    gap: 30,
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
    },
  },

  eventHeaderInfoTitle: {
    color: '#fff',
    fontSize: FS18,
    lineHeight: '130%',
    fontWeight: 400,
    '@media (max-width: 960px)': {
      fontSize: MobileFS18,
    },
  },

  eventInfoText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    '@media (max-width: 960px)': {
      fontSize: MobileFS28,
    },
  },

  liveChatText: {
    color: '#fff',
    fontSize: 18,
  },

  eventRegButtonOwner: {
    width: '100%',
    padding: '21px 52px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  eventRegButtonUser: {
    width: '100%',
    padding: '21px 115px',
  },

  eventApproveButtonUser: {
    width: '100%',
    padding: '21px 0',
  },

  eventStreamButtonOwner: {
    padding: '9px 27px',
    cursor: 'pointer',
    borderRadius: 4,
    '@media (max-width: 960px)': {
      width: '100%',
    },
  },

  eventStreamGenerateButtonOwner: {
    padding: '9px 27px',
    cursor: 'pointer',
    borderRadius: 4,
    '@media (max-width: 960px)': {
      padding: '21px',
      width: '100%',
      borderRadius: 0,
    },
  },
  timerText: {
    color: '#fff',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '130%',
  },

  date: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '120%',
  },

  markdownText: {
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
    },
  },
}));

export default useStyles;
