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
}));

export default useStyles;
