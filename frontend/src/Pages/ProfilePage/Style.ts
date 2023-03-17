import { makeStyles } from '@material-ui/core/styles';
import { FS18, FS24, uploadTextFS24, FS72, MobileFS20, MobileFS24 } from '../../rules/index';

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
    textTransform: 'uppercase',
  },

  bio: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '130%',
    whiteSpace: 'pre',
  },

  shortDescText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
  },

  dialogButton: {
    padding: '25px 0',
    width: '100%',
    marginTop: 20,
  },

  editButton: {
    padding: '16px 38px',
    width: '100%',
    marginTop: 20,
  },

  endProjectsHeader: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    textTransform: 'uppercase',
    fontWeight: 500,
  },

  linkText: {
    fontSize: uploadTextFS24,
  },

  profileHeaders: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
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
}));

export default useStyles;
