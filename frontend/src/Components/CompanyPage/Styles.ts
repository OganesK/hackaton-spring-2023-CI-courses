import { makeStyles } from '@material-ui/core/styles';
import { FS24, FS18, MobileFS20, MobileFS24 } from '../../rules/index';

const useStyles = makeStyles(theme => ({
  dateText: {
    fontSize: FS24,
    lineHeight: '130%',
    color: '#252525',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 500,
    marginTop: 15,
  },

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

  modalDefaultImgContainer: {
    border: '1px solid #CFD1DC',
    paddingTop: '25px',
    paddingBottom: '25px',
    cursor: 'pointer',
  },

  modalDefaultImg: {
    height: 56,
    width: 56,
  },

  modalButton: {
    padding: '15px 0',
    width: '100%',
  },

  //_____________________

  contactsTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
  },
  contactsMobileTitle: {
    color: '#252525',
    fontSize: MobileFS20,
    lineHeight: '120%',
    fontWeight: 400,
  },

  contactsText: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS18,
    lineHeight: '120%',
  },

  contactsMobileText: {
    color: '#252525',
    fontWeight: 500,
    fontSize: MobileFS24,
    lineHeight: '120%',
    textAlign: 'center',
  },
}));

export default useStyles;
