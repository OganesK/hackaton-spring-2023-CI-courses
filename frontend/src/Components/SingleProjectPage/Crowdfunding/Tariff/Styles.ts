import { makeStyles } from '@material-ui/core/styles';
import { FS18, sideBarFS18, MobileFS18, MobileFS20, MobileFS24 } from '../../../../rules/index';

const useStyles = makeStyles(theme => ({
  tariffContainer: {
    padding: 20,
    border: '1px solid #CFD1DC',
    width: '100%',
    gap: 15,
  },

  tariffHeader: {
    fontSize: 18,
    lineHeight: '130%',
    color: '#FF5631',
    wordBreak: 'break-word',
    '@media (max-width: 960px)': {
      fontSize: MobileFS20,
    },
  },

  tariffPrice: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: '140%',
    color: '#252525',
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
    },
  },

  tariffDesc: {
    fontSize: 18,
    lineHeight: '130%',
    color: '#252525',
    marginTop: 10,
  },

  tariffMobileDesc: {
    fontSize: MobileFS24,
    lineHeight: '130%',
    color: '#252525',
    marginTop: 10,
  },

  tariffBuyers: {
    fontSize: 14,
    lineHeight: '130%',
    color: '#252525',
    '@media (max-width: 960px)': {
      fontSize: MobileFS20,
    },
  },

  buyButton: {
    padding: '12px 0px',
    width: '100%',
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
      fontSize: MobileFS18,
    },
  },
}));

export default useStyles;
