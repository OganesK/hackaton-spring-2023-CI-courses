/* eslint @typescript-eslint/no-floating-promises: 0 */
import { useMutation } from '@apollo/client';
import { Box, Slide, Fab, Grid, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useContext, useState } from 'react';
import { userContext } from '../../../Context/context';
import { MessagesPageContext } from '../../../Pages/Messages/context';
import { SEND_MESSAGE_MUTATION } from '../graphql/mutation';
import { IMessage } from '../typings';
import { CustomScrollbarWrapper, useStylesInput } from './Style';

interface MessageInputProps {
  addMsg: (msg: IMessage) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ addMsg }) => {
  const contextUserData = useContext(userContext);
  const { activeGroupId } = useContext(MessagesPageContext);

  const [message, setMessage] = useState('');
  const classes = useStylesInput();

  const [sendMessage] = useMutation<{ sendMessage: IMessage }>(SEND_MESSAGE_MUTATION, {
    variables: {
      data: {
        text: message,
        senderId: contextUserData.user.id,
        groupId: activeGroupId,
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
      // console.log(res.data!.sendMessage);
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
      <Box>
        <CustomScrollbarWrapper>
          <TextField
            value={message}
            onChange={handleMessage}
            label="Сообщение"
            multiline
            maxRows={4}
            variant="outlined"
            fullWidth
            onKeyDown={onKeyDown}
            className={classes.input}
          />
        </CustomScrollbarWrapper>
      </Box>
      <Box className={classes.sendButton} onClick={handleSendMessage}>
        <Slide direction="up" in={message === '' ? false : true}>
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Slide>
      </Box>
    </Grid>
  );
};

export default MessageInput;
