import { Grid } from '@mui/material';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useChatStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headBG: {
    backgroundColor: 'black',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    overflow: 'auto',
  },
});

export const useStylesMessages = makeStyles((theme: Theme) =>
  createStyles({
    messageBox: {
      padding: '10px 24px 10px 24px',
    },

    messageContainer: {
      textAlign: 'left',
      minWidth: 100,
      gap: 8,
    },

    messageUser: {
      marginRight: 8,
      color: '#AAADB3',
      fontWeight: 500,
      fontSize: 16,
    },

    messageText: {
      fontSize: 16,
      lineHeight: '130%',
      color: '#252525',
      marginBottom: 2,
    },
  }),
);

export const useStylesInput = makeStyles({
  MessageInput: {
    width: '100%',
    padding: 20,
    paddingTop: 5,
    background: '#EBEBEB',
    position: 'sticky',
    bottom: '0px',
    backdropFilter: 'blur(30px) saturate(200%)',
  },
  input: {
    whiteSpace: 'nowrap',
    marginRight: '20px',
  },
  inputField: {
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '11fr 1fr',
    justifyContent: 'center',
  },
  sendButton: {
    marginLeft: '20px',
  },
});

export const CustomScrollbarWrapper = styled('div')(({ theme }) => ({
  // display: 'none',
  minWidth: 0,

  '> div > div > textarea::-webkit-scrollbar': {
    width: '6px',
  },
  '> div > div > textarea::-webkit-scrollbar-track': {
    backgroundColor: '#e8e8e8',
    borderRadius: '100px',
  },
  '> div > div > textarea::-webkit-scrollbar-thumb': {
    backgroundColor: '#d6d6d6',
    borderRadius: '100px',
  },
}));

export const GroupInfoModalButton = styled(Grid)`
  cursor: pointer;

  @media (min-width: 991px) {
    &:hover {
      text-decoration: underline;
    }
  }
`;
