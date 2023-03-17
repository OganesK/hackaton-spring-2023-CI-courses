import { makeStyles } from '@material-ui/core/styles';
import { styled as styledMUI } from '@mui/material/styles';
import { FS16, FS18, FS24, uploadTextFS24, FS14, FS48 } from '../../../rules/index';

export const DescriptionResourceText = styledMUI('div')`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: auto;
  transition: all .5s ease;
  padding: 15px 20px;
`;

export const ArrowIconWrapper = styledMUI('div')`
  position: absolute;
  right: 25px;
  bottom: 25px;
`;

const useStyles = makeStyles(theme => ({
  postBox: {
    // border: '1px solid #111',
  },

  postContainer: {
    border: '0px solid #CFD1DC',
    // marginBottom: 40,
    gap: 10,
  },

  postIconContainer: {
    marginBottom: 10,
    border: '1px solid #CFD1DC',
    borderRadius: '50%',
    backgroundColor: '#fff',
    padding: '10px 11px',
  },

  postSmallIconContainer: {
    marginBottom: 10,
    border: '1px solid #CFD1DC',
    borderRadius: '50%',
    backgroundColor: '#fff',
    padding: '6px 7px',
  },

  linkText: {
    fontSize: uploadTextFS24,
  },

  posterTextBlock: {
    height: '100%',
    maxHeight: 'calc(100% - 55px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: FS24,
  },

  dateText: {
    marginTop: 10,
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
  },

  categoryText: {
    color: '#FF5631',
    fontSize: FS16,
    lineHeight: '130%',
  },

  titleText: {
    color: '#fff',
    fontSize: FS24,
    fontWeight: 500,
    lineHeight: '120%',
    textTransform: 'uppercase',
    background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 48.32%, rgba(0, 0, 0, 0) 100%)',
    '@media (max-width: 960px)': {
      textTransform: 'none',
    },
  },

  nameText: {
    color: '#252525',
    fontSize: FS18,
    fontWeight: 500,
    lineHeight: '120%',
  },

  postIcon: {
    width: 30,
    height: 30,
  },

  postSmallIcon: {
    width: 18,
    height: 18,
  },

  postHeaderDescription: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    fontWeight: 500,
    wordBreak: 'break-word',
  },

  postDescription: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    fontWeight: 400,
    wordBreak: 'break-word',
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

  fullModalHeader: {
    color: '#252525',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    // paddingBottom: 40,
  },

  fullModalDate: {
    color: '#AAADB2',
    fontSize: 16,
    lineHeight: '125%',
    fontWeight: 300,
    marginBottom: 40,
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    marginBottom: 20,
    wordBreak: 'break-word',
  },

  fullModalInfo: {
    fontSize: 20,
    lineHeight: '130%',
    marginBottom: 4,
    fontWeight: 500,
  },
}));

export default useStyles;
