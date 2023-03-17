import { makeStyles } from '@material-ui/core/styles';
import { FS18, FS24, FS72, MobileFS20, MobileFS24 } from '../../rules/index';

const useStyles = makeStyles(() => ({
  profileHeader: {
    color: '#252525',
    fontSize: FS72,
    lineHeight: '86px',
    fontWeight: 300,
  },

  fullName: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    fontWeight: 500,
  },

  bio: {
    color: '#252525',
    fontSize: 16,
    lineHeight: '130%',
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
    },
  },

  onPlatform: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    '@media (max-width: 960px)': {
      fontSize: MobileFS20,
    },
  },

  activity: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
  },

  dialogButton: {
    padding: '25px 0',
    width: '100%',
    // marginTop: 20,
  },

  editButton: {
    padding: '16px 38px',
    width: '100%',
    // marginTop: 20,
  },

  companyHeaders: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  ownerText: {
    color: '#FF5631',
    fontSize: FS18,
    '@media (max-width: 960px)': {
      fontSize: MobileFS24,
    },
    lineHeight: '120%',
    fontWeight: 500,
    cursor: 'pointer',
  },

  linkText: {
    fontSize: FS18,
  },

  contactsText: {
    color: '#252525',
    fontWeight: 500,
    fontSize: 18,
    lineHeight: '120%',
    textAlign: 'end',
    gap: 2,
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

  collapseReactMarkdown: {
    color: '#252525',
    lineHeight: '130%',
    fontSize: 'clamp(0.75rem, 0.4688rem + 1.25vw, 1.125rem)',
  },

  companyContactsMobileHeader: {
    color: '#252525',
    fontSize: MobileFS20,
    lineHeight: '120%',
    fontWeight: 400,
  },
}));

export default useStyles;
