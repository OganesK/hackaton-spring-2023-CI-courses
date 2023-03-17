import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  partnersBox: {
    color: 'black',
    backgroundColor: '#fff',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #d0d2d6',
  },

  partnersContainer: {
    maxWidth: 200,
    padding: '17% 10%',
    transition: 'all 0.5s ease',
    cursor: 'pointer',
  },

  partnersImg: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
    maxHeight: '180px',
  },
}));

export default useStyles;
