import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18, FS24 } from '../../../../../../rules/index';

const useStyles = makeStyles(() => ({
  postBox: {
    // marginTop: 50,
  },

  postContainer: {
    border: '0px solid #CFD1DC',
    marginBottom: 40,
    gap: 10,
  },

  postIconContainer: {
    marginBottom: 10,
    border: '1px solid #CFD1DC',
    borderRadius: '50%',
    backgroundColor: '#fff',
    padding: '10px 11px',
  },

  postIcon: {
    width: 30,
    height: 30,
  },

  postHeaderDescription: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    fontWeight: 500,
  },

  postDescription: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    fontWeight: 400,
  },

  postImage: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  postDateContainer: {
    color: '#AAADB2',
    fontSize: FS14,
    lineHeight: '130%',
    fontWeight: 300,
  },
}));

export default useStyles;
