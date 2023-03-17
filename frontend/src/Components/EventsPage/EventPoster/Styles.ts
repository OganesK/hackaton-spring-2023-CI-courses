import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18, FS24, MobileFS24 } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  event: {
    gap: 20,
  },

  eventImage: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  streamActivePart: {
    width: '100%',
    height: 90,
    padding: '30px 40px',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 48.32%, rgba(0, 0, 0, 0) 100%)',
    fontSize: FS24,
    lineHeight: '130%',
    color: '#fff',
    cursor: 'default',
    '@media (max-width: 600px)': {
      padding: '15px 20px',
    },
  },

  eventDescription: {
    wordBreak: 'break-word',
  },

  eventDescriptionHeader: {
    color: '#252525',
    fontSize: MobileFS24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  eventDescriptionTitle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 400,
    margin: '18px 0',
    textTransform: 'none',
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS18,
    lineHeight: '100%',
    fontWeight: 400,
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

  eventDescriptionLinkContainer: {
    // marginTop: 200,
  },

  eventDescriptionLink: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '100%',
    fontWeight: 400,
  },

  colorLink: {
    color: '#252525',
    fontWeight: 500,
  },

  newsDescriptionDate: {
    color: '#AAADB2',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 300,
    marginTop: 10,
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
    border: '1px solid',
  },
}));

export default useStyles;
