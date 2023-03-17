import { makeStyles } from '@material-ui/core/styles';

import { FS18, FS24 } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  project: {
    gap: 60,
    textDecoration: 'none',
  },

  projectImage: {
    width: '100%',
    backgroundColor: '#CFD1DC',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },

  projectRealImage: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },

  projectDescriptionHeader: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  projectDescriptionTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    fontWeight: 400,
  },

  projectDescriptionLinkContainer: {
    marginTop: 10,
  },

  projectDescriptionLink: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '100%',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: 10,
    '&:hover': {
      color: '#FF5631',
      transition: 'all 0.5s ease',
    },
  },
}));

export default useStyles;
