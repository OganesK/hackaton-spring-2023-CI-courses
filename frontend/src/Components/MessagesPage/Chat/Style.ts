import { Grid } from '@mui/material';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FS16, FS18, MobileFS18 } from '../../../rules';

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
      fontFamily: 'sans-serif',
      fontWeight: 'lighter',
      cursor: 'pointer',
    },

    messageContainer: {
      borderRadius: 15,
      color: '#eee',
      textAlign: 'left',
      minWidth: 100,
      maxWidth: '45%',
      padding: '15px 15px 10px 20px',
      wordWrap: 'break-word',
      boxShadow: '0px 0px 30px 1px rgba(0, 0, 0, 0.2)',

      //=============SPECIAL ===================//
      backdropFilter: 'blur(20px) saturate(200%)',
      background: 'rgba(37, 37, 37, 0.8);',

      [theme.breakpoints.down('sm')]: {
        maxWidth: 350,
        minWidth: 70,
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: 250,
        minWidth: 70,
      },
    },

    messageContainerOther: {
      borderRadius: 15,
      color: '#000',
      textAlign: 'left',
      minWidth: 100,
      maxWidth: '45%',
      padding: '15px 15px 10px 20px',
      wordWrap: 'break-word',
      boxShadow: '0px 0px 30px 1px rgba(0, 0, 0, 0.2)',

      //=============SPECIAL ===================//
      backdropFilter: 'blur(20px) saturate(200%)',
      background: 'rgba(255, 255, 255, 0.8)',

      [theme.breakpoints.down('sm')]: {
        maxWidth: 350,
        minWidth: 70,
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: 250,
        minWidth: 70,
      },
    },
    messageText: {
      fontSize: 17,
      marginBottom: 7,
    },
    messageTime: {
      fontSize: 12,
      textAlign: 'right',
      lineHeight: '12px',
    },
  }),
);

export const useStylesInput = makeStyles({
  MessageInput: {
    width: '100%',
    padding: 16,
    background: 'rgba(255,255,255,0.6)',
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
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '20px',
  },
});

export const useStylesGroupModal = makeStyles({
  modalGroupButton: {
    padding: '9px 20px',
    cursor: 'pointer',
    borderRadius: 4,
    width: '100%',
  },

  partHeader: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '120%',
    fontWeight: 500,
    textTransform: 'uppercase',
    paddingBottom: 20,
    '@media (max-width:899px)': {
      paddingBottom: 10,
    },
  },

  participantName: {
    color: '#252525',
    fontWeight: 500,
    fontSize: FS18,
    lineHeight: '140%',
    '@media (max-width:960px)': {
      fontSize: MobileFS18,
    },
  },

  adminText: {
    color: '#AAADB2',
    fontSize: 14,
    lineHeight: '130%',
    '@media (max-width:960px)': {
      fontSize: 12,
    },
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
