import { makeStyles } from '@material-ui/core/styles';
import { FS16, FS18, FS24, FS72, lineHeightFS86, MobileFS20, MobileFS24, MobileFS48 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  glass: {
    width: '100%',
    height: 26,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#ebebed',
  },

  progress: {
    borderRadius: 2,
    height: 26,
    zIndex: 333,
    maxWidth: '100%',
  },

  progressPercent: {
    // height: 26,
    color: '#fff',
    zIndex: 334,
    textAlign: 'end',
    padding: '3px 8px 0 0',
  },

  sumHeader: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '120%',
    color: '#252525',
  },

  sumText: {
    fontSize: 14,
    lineHeight: '130%',
    color: '#AAADB2',
  },
}));

export default useStyles;
