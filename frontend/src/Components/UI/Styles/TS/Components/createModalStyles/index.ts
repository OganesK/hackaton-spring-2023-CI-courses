import { makeStyles } from '@material-ui/core/styles';
import { FS18, MobileFS20 } from '../../../../../../rules/index';

const useStyles = makeStyles(() => ({
  modalContainer: {
    gap: 20,
    position: 'relative',
    padding: '40px 60px 80px 60px',
    '@media (max-width: 899px)': {
      gap: 30,
      padding: 'clamp(1.25rem, 5%, 2.5rem)',
    },
  },

  modalHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 40,
    '@media (max-width:899px)': {
      paddingBottom: 20,
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

  modalAcquiringText: {
    color: '#AAADB2',
    fontSize: 12,
    lineHeight: '130%',
    fontWeight: 300,
  },

  inputContainerGap: {
    gap: 30,
    '@media (max-width: 899px)': {
      gap: 15,
    },
  },

  articleImage: {
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  dateTime: {
    width: '100%',
  },

  imgConditionText: {
    color: '#AAADB2',
    fontSize: 16,
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

  modalButtonContainer: {
    marginTop: 40,
    paddingLeft: 30,
    gap: 20,
  },

  modalMobileButtonContainer: {
    marginTop: 30,
    gap: 20,
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
  },
}));

export default useStyles;
