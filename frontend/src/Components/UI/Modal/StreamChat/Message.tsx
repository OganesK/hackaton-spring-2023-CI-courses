import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import { userContext } from '../../../../Context/context';

import { useStylesMessages } from './Style';
import { IMessage } from './graphql/typings';
import { Avatar, Typography } from '@mui/material';

interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const classes = useStylesMessages();

  const time = new Date(message.createdAt.toString());
  const messageTime = `${`0${time.getHours()}`.slice(-2)}:${`0${time.getMinutes()}`.slice(
    -2,
  )} ${`0${time.getDate()}`.slice(-2)}.${`0${time.getMonth() + 1}`.slice(-2)}.${time.getFullYear()}`;

  return (
    <Grid container justifyContent="flex-start" className={classes.messageBox} style={{ wordBreak: 'break-all' }}>
      <Grid container alignItems="center" className={classes.messageContainer} xs={11}>
        <Grid item>
          <Avatar src={message.sender.avatar?.link} style={{ width: 30, height: 30 }} />
        </Grid>
        <Grid item className={classes.messageUser}>{`${message.sender.firstname} ${message.sender.lastname}`}</Grid>

        <Grid item className={classes.messageText}>
          {message.text}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;
