import { makeStyles } from '@material-ui/core/styles';
import { FS18 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  modalHeader: {
    color: '#252525',
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 40,
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

  articleImg: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },

  articleVideo: {
    width: '100%',
    height: 'auto',
    maxHeight: 550,
    objectFit: 'contain',
    backgroundColor: '#f4f5fa',
  },
}));

export default useStyles;
