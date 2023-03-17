import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18, FS72 } from '../../rules/index';

const useStyles = makeStyles(theme => ({
  headerParticipantsList: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS18,
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
  sloganText: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: FS72,
    lineHeight: '80px',
    letterSpacing: '-0.01em',
    color: '#252525',
  },

  containerModerationInfo: {
    margin: '20px 0',
    gap: 60,
    wordBreak: 'break-word',
  },

  containerModerationImage: {
    width: '100%',
    backgroundColor: '#CFD1DC',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  containerModerationRealImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },

  containerModerationDescriptionHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  containerModerationDescriptionTitle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    fontWeight: 400,
    marginTop: 20,
    textTransform: 'none',
  },

  containerModerationCreationInfo: {
    color: '#252525',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 400,
    marginTop: 20,
    textTransform: 'none',
  },

  dateContainer: {
    color: '#AAADB2',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 300,
    marginBottom: 10,
    textTransform: 'none',
  },
}));

export default useStyles;
