import { makeStyles } from '@material-ui/core/styles';
import { FS14, FS18forCards, FS24forCards } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  glass: {
    width: '100%',
    height: 6,
    overflow: 'hidden',
    backgroundColor: '#CFD1DC',
    border: '1px solid #CFD1DC',
    borderBottom: '0px solid',
  },

  progress: {
    height: 6,
    backgroundColor: '#252525',
    zIndex: 333,
    maxWidth: '100%',
  },

  sumHeader: {
    fontWeight: 500,
    fontSize: FS24forCards,
    lineHeight: '120%',
    color: '#252525',
  },

  sumText: {
    fontSize: FS14,
    lineHeight: '130%',
    color: '#AAADB2',
  },

  cardContainer: {
    padding: '40px 30px',
    height: '100%',
    '@media (max-width: 600px)': {
      padding: '40px 20px',
    },
  },

  cardContainerHover: {
    padding: '40px 30px',
    height: '100%',
    gap: 20,
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.47) 0.01%, rgba(0, 0, 0, 0) 50%)',
    '@media (max-width: 600px)': {
      padding: '40px 20px',
    },
  },

  crowdProjectName: {
    fontSize: FS18forCards,
    lineHeight: '120%',
    color: '#FF5631',
  },

  crowdName: {
    fontSize: FS24forCards,
    fontWeight: 500,
    lineHeight: '120%',
    textTransform: 'uppercase',
    color: '#252525',
  },

  crowdDescription: {
    fontSize: FS18forCards,
    lineHeight: '130%',
    color: '#252525',
    paddingTop: 18,
  },

  goToText: {
    fontSize: FS18forCards,
    lineHeight: '130%',
    color: '#fff',
  },

  projectName: {
    fontSize: FS24forCards,
    fontWeight: 500,
    lineHeight: '120%',
    textTransform: 'uppercase',
    color: '#fff',
  },

  helpButton: {
    padding: '28px 0',
    width: '100%',
    borderTop: '1px solid #CFD1DC',

    textTransform: 'uppercase',
    fontSize: FS18forCards,
    fontWeight: 500,
    lineHeight: '100%',
    transition: 'all 0.5s ease',
  },
}));

export default useStyles;
