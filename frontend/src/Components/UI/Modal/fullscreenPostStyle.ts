import { makeStyles } from '@material-ui/core/styles';
import { FS16, FS18, FS24, FS48, MobileFS20 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  modalHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 40,
  },

  fullModalHeader: {
    color: '#252525',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    wordBreak: 'break-word',
  },

  fullModalDate: {
    color: '#AAADB2',
    fontSize: 16,
    lineHeight: '125%',
    fontWeight: 300,
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    wordBreak: 'break-word',
  },

  fullModalInfo: {
    fontSize: 20,
    lineHeight: '130%',
    fontWeight: 500,
  },

  nameText: {
    color: '#252525',
    fontSize: FS18,
    fontWeight: 500,
    lineHeight: '120%',
  },

  articleImage: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  imgConditionText: {
    color: '#AAADB2',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 300,
  },

  additionalPartnerStyle: {
    color: 'black',
    backgroundColor: '#fff',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
    border: '1px solid',
  },

  colorLink: {
    color: '#252525',
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS24,
    lineHeight: '100%',
    fontWeight: 500,
  },

  modalArticleHeader: {
    textTransform: 'uppercase',
    fontSize: FS18,
    color: '#252525',
    fontWeight: 500,
  },

  eventInfoTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 400,
    gap: 30,
  },

  eventInfoText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    // maxWidth: 300,
  },

  modalContainer: {
    gap: 20,
    position: 'relative',
    padding: '40px 60px 80px 60px',
    '@media (max-width: 899px)': {
      gap: 30,
      padding: 'clamp(1.25rem, 5%, 2.5rem)',
    },
  },

  modalInputLine: {
    gap: 30,
    '@media (max-width: 899px)': {
      gap: 15,
    },
  },

  modalHeaderText: {
    '@media (max-width:899px)': {
      color: '#AAADB2',
      fontSize: MobileFS20,
      lineHeight: '130%',
      fontWeight: 300,
    },
  },

  dateTime: {
    width: '100%',
  },
}));

export default useStyles;
