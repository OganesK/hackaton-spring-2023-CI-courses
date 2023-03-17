import { makeStyles } from '@material-ui/core/styles';

import { FS18, FS24 } from '../../../rules/index';

const useStyles = makeStyles(() => ({
  lastNewsBox: {
    // marginTop: 150,
    // '@media (max-width: 960px)': {
    //   marginTop: 100,
    // },
    // '@media (max-width: 600px)': {
    //   marginTop: 80,
    // },
  },

  lastNewsContainer: {
    minHeight: 380,
    '@media (max-width: 600px)': {
      minHeight: 300,
      marginBottom: 30,
    },
  },

  imageLastNewsContainer: {
    backgroundColor: '#CFD1DC',
    width: '100%',
  },

  headerTextLastNews: {
    fontSize: FS18,
    lineHeight: '100%',
    color: '#252525',
    fontWeight: 500,
    marginTop: 20,
    height: 55,
    '@media (max-width: 600px)': {
      height: 30,
    },
  },

  dateTextLastNews: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#252525',
  },

  titleTextLastNews: {
    fontSize: FS24,
    color: '#252525',
    lineHeight: '120%',
    marginTop: 20,
    textTransform: 'uppercase',
    fontWeight: 500,
    height: 115,
    '@media (max-width: 600px)': {
      height: 50,
    },
  },

  colorLink: {
    color: '#FF5631',
  },
  colorLinkNews: {
    color: '#252525',
  },
}));

export default useStyles;
