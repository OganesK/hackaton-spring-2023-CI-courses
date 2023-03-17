/* eslint @typescript-eslint/no-floating-promises: 0 */
/* eslint-disable  @typescript-eslint/ban-ts-comment */
import { useQuery, useSubscription } from '@apollo/client';
import { Box, Snackbar, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../../UI/Loading/Loading';
import { NEW_STREAM_MESSAGES_SUBSCRIPTION, MESSAGES_IN_STREAM_QUERY } from './graphql/queries';
import { IMessage } from './graphql/typings';
import StreamMessageInput from './StreamMessageInput';
import StreamMessagesBlock from './StreamMessagesBlock';
import { userContext } from '../../../../Context/context';

const Wrapper = styled(Box)(({ theme }) => ({
  height: 'calc(70vh - 120px)',
  '@media (max-width: 1199px)': {
    height: 'calc(70vh - 84px)',
  },
  '@media (max-width: 600px)': {
    height: 'calc(70vh - 74px)',
  },
}));

interface StreamChatProps {
  streamId: number;
}

const StreamChat: React.FC<StreamChatProps> = ({ streamId }) => {
  const { data, loading, error } = useQuery<{ getMessageInStream: IMessage[] }>(MESSAGES_IN_STREAM_QUERY, {
    variables: {
      data: { streamId },
    },
  });
  const [messages, setMessages] = useState<IMessage[]>([]);
  const context = useContext(userContext);

  const {
    data: dataNewMessage,
    error: subscriptionError,
    loading: subscriptionLooading,
  } = useSubscription<{ streamChat: IMessage }>(NEW_STREAM_MESSAGES_SUBSCRIPTION, {
    variables: {
      streamId,
    },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.streamChat) {
        setMessages(messages.concat(data.streamChat));
      }
    },
    shouldResubscribe: true,
  });

  const addMsg = (msg: IMessage): void => {
    // console.log('adding', msg);
    // setMessages(msgs => [...msgs, msg]);
  };

  useEffect(() => {
    if (!loading && data?.getMessageInStream) {
      setMessages(data.getMessageInStream);
    }
  }, [loading]);

  return (
    <Wrapper
      style={{
        display: 'grid',
        width: '100%',
        background: '#EBEBEB',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <StreamMessagesBlock messages={messages} />
      {context.user ? <StreamMessageInput addMsg={addMsg} streamId={streamId} /> : null}
    </Wrapper>
  );
};

export default StreamChat;
