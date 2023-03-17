import { makeStyles } from '@material-ui/core/styles';
import { Grid, styled } from '@mui/material';

const useStyles = makeStyles(() => ({
  profileHeader: {
    color: '#252525',
  },
  noDialogChosen: {
    display: 'flex',
  },
}));

export default useStyles;

export const GridChat = styled(Grid)`
  position: relative;
  z-index: 500;
  height: calc(100vh - 120px);
  @media (max-width: 1199px) {
    height: calc(100vh - 84px);
  }
  @media (max-width: 600px) {
    height: calc(100vh - 74px);
  }
`;
