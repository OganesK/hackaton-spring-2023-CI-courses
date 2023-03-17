import { makeStyles } from '@material-ui/core/styles';
import { FS48 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  headerStyle: {
    textTransform: 'uppercase',
    fontSize: FS48,
    lineHeight: '116%',
    color: '#252525',
    fontWeight: 500,
  },
}));

export default useStyles;
