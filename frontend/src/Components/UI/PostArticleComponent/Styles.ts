import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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

  navigationArticleHeader: {
    backgroundColor: '#fff',
    position: 'sticky',
    padding: '6px 0 5px 0',
    top: -1,
    zIndex: 10,
    minHeight: 48,
  },

  showBtn: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '120%',
    fontWeight: 500,
    cursor: 'pointer',
  },

  showBtnDiv: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
}));

export default useStyles;
