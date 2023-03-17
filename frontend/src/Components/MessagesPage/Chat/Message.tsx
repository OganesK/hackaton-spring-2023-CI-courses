import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { userContext } from '../../../Context/context';

import { useStylesMessages } from './Style';
import { IMessage } from '../typings';
import { Avatar, Typography } from '@mui/material';

interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const classes = useStylesMessages();
  const Context = useContext(userContext);

  const time = new Date(message.createdAt.toString());
  const messageTime = `${`0${time.getHours()}`.slice(-2)}:${`0${time.getMinutes()}`.slice(
    -2,
  )} ${`0${time.getDate()}`.slice(-2)}.${`0${time.getMonth() + 1}`.slice(-2)}.${time.getFullYear()}`;

  return (
    <ListItem>
      <Grid container>
        <Grid
          container
          justifyContent={message.sender.id === Context.user.id ? 'flex-end' : 'flex-start'}
          className={classes.messageBox}
          style={{ wordBreak: 'break-all' }}
        >
          <Grid
            style={{ display: 'flex' }}
            className={message.sender.id === Context.user.id ? classes.messageContainer : classes.messageContainerOther}
          >
            <Avatar src={message.sender.avatar?.link} style={{ marginRight: 12 }} />
            <Grid>
              <Typography
                fontWeight={700}
                style={{ marginBottom: 5 }}
              >{`${message.sender.firstname} ${message.sender.lastname}`}</Typography>
              <Grid className={classes.messageText}>{message.text}</Grid>
              <Grid className={classes.messageTime}>{messageTime}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Message;
