import { FS16, FS18, FS72 } from '../../../../../rules/index';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sloganText: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: FS72,
    lineHeight: '86px',
    letterSpacing: '-0.045em',
    color: '#252525',
    textTransform: 'uppercase',
    margin: '50px 0',
    '@media (max-width: 600px)': {
      margin: 0,
    },
  },

  projectHeader: {
    color: '#252525',
    fontSize: FS72,
    lineHeight: '86px',
    margin: 'auto',
    wordBreak: 'break-word',
  },

  postPresentationBox: {
    gap: 20,
    borderLeft: '1px solid #CFD1DC',
  },

  stageHeader: {
    fontWeight: 400,
    fontSize: FS16,
    lineHeight: '130%',
    color: '#929292',
  },
  stageTitle: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
  },
}));

export default useStyles;
