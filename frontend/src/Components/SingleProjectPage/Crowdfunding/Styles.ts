import { makeStyles } from '@material-ui/core/styles';
import { FS16, FS18, FS24, FS72, sideBarFS18, MobileFS24, MobileFS48, lineHeightFS86 } from '../../../rules/index';

const useStyles = makeStyles(theme => ({
  crowdHeader: {
    fontSize: 18,
    lineHeight: '120%',
    color: '#252525',
  },

  crowdTitle: {
    fontSize: 24,
    lineHeight: '120%',
    fontWeight: 500,
    color: '#252525',
    textTransform: 'uppercase',
    '@media (max-width: 960px)': {
      textTransform: 'none',
    },
  },

  glass: {
    width: '100%',
    height: 26,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#ebebed',
  },

  progress: {
    borderRadius: 2,
    height: 26,
    zIndex: 333,
    maxWidth: '100%',
  },

  progressPercent: {
    // height: 26,
    color: '#fff',
    zIndex: 334,
    textAlign: 'end',
    padding: '3px 8px 0 0',
  },

  sumHeader: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '120%',
    color: '#252525',
  },

  sumText: {
    fontSize: 14,
    lineHeight: '130%',
    color: '#AAADB2',
  },

  collapseAnchor: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    width: '100%',
    marginTop: 20,
    textDecoration: 'none',
    fontWeight: 500,
    display: 'block',
  },

  collapseCrowdfundingDesc: {
    color: '#252525',
    lineHeight: '130%',
    fontSize: 'clamp(0.75rem, 0.4688rem + 1.25vw, 1.125rem)',
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
    },
  },

  tariffContainer: {
    padding: 20,
    border: '1px solid #CFD1DC',
    height: 380,
  },

  tariffHeader: {
    fontSize: 18,
    lineHeight: '130%',
    color: '#FF5631',
  },

  tariffPrice: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '140%',
    color: '#252525',
  },

  tariffDesc: {
    fontSize: 18,
    lineHeight: '130%',
    color: '#252525',
    marginTop: 10,
  },

  tariffBuyers: {
    fontSize: 14,
    lineHeight: '130%',
    color: '#252525',
  },

  buyButton: {
    padding: '12px 0px',
    width: '100%',
  },
}));

export default useStyles;
