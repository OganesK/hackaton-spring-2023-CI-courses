import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    gap: 150,
    '@media (max-width: 960px)': {
      gap: 100,
    },
    '@media (max-width: 600px)': {
      gap: 80,
    },
  },

  articleBox: {
    margin: 'auto',
    gap: 240,
    '@media (max-width: 960px)': {
      gap: 160,
    },
    '@media (max-width: 600px)': {
      gap: 120,
    },
  },

  events: {
    // marginTop: 200,
  },
}));

export default useStyles;
