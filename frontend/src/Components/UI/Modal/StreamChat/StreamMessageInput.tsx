/* eslint @typescript-eslint/no-floating-promises: 0 */
import React, { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useMutation } from '@apollo/client';
import { Box, Slide, Fab, Grid, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { userContext } from '../../../../Context/context';
import SendMessageIcon from '../../../../assets/icons/sendMessage.svg';

import { SEND_STREAM_MESSAGE_MUTATION } from './graphql/mutation';
import { IMessage } from './graphql/typings';
import { CustomScrollbarWrapper, useStylesInput } from './Style';

interface MessageInputProps {
  addMsg: (msg: IMessage) => void;
  streamId: number;
}

const StreamMessageInput: React.FC<MessageInputProps> = ({ addMsg, streamId }) => {
  const contextUserData = useContext(userContext);

  const [message, setMessage] = useState('');
  const classes = useStylesInput();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const [sendMessage] = useMutation<{ sendMessage: IMessage }>(SEND_STREAM_MESSAGE_MUTATION, {
    variables: {
      data: {
        text: message,
        senderId: contextUserData.user.id,
        streamId: streamId,
      },
    },
  });

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (): Promise<void> => {
    if (message === '') return;
    setMessage('');
    try {
      const res = await sendMessage();
      addMsg(res.data!.sendMessage);
    } catch (err) {
      console.error('error sending message', err);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (!event.shiftKey) {
        handleSendMessage();
      }
    }
  };

  return (
    <Grid container className={`${classes.MessageInput} ${classes.inputField}`}>
      <Grid>
        <CustomScrollbarWrapper>
          <TextField
            value={message}
            onChange={handleMessage}
            placeholder="Напишите что-нибудь"
            multiline={isMobile ? false : true}
            maxRows={4}
            variant="outlined"
            fullWidth
            onKeyDown={onKeyDown}
            className={classes.input}
            inputProps={{
              maxLength: 1000,
            }}
          />
        </CustomScrollbarWrapper>
      </Grid>
      <Grid className={classes.sendButton} onClick={handleSendMessage}>
        <Slide direction="up" in={message === '' ? false : true} style={{ cursor: 'pointer', padding: 10 }}>
          <img src={SendMessageIcon} />
        </Slide>
      </Grid>
    </Grid>
  );
};

export default StreamMessageInput;
