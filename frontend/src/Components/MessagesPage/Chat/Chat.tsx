/* eslint @typescript-eslint/no-floating-promises: 0 */
/* eslint-disable  @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { alertTitleClasses, Box, Snackbar, styled } from '@mui/material';
import getMediaStream from './VisualConference/hooks/utils';
import { MessagesPageContext } from '../../../Pages/Messages/context';
import Loading from '../../UI/Loading/Loading';
import { GET_MESSAGE_IN_GROUP, NEW_MESSAGES_SUBSCRIPTION } from '../graphql/query';
import { IMessage, IMyGroup } from '../typings';
import GroupInfo from './GroupInfo';
import MessageInput from './MessageInput';
import MessagesBlock from './MessagesBlock';
import { ACTIONS } from './VisualConference/socket/actions';
import socket from './VisualConference/socket/socket';
import VisualConferenceRoom from './VisualConference/VisualConferenceRoom';
import { userContext } from '../../../Context/context';

const Wrapper = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 120px)',
  '@media (max-width: 1199px)': {
    height: 'calc(100vh - 84px)',
  },
  '@media (max-width: 600px)': {
    height: 'calc(100vh - 74px)',
  },
}));

const Chat: React.FC = () => {
  const { activeGroupId } = useContext(MessagesPageContext);
  const [active, setActive] = useState<number>(activeGroupId);
  const [roomsIDS, setRoomsIDS] = useState<string[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const context = useContext(userContext);

  const {
    data: dataGroup,
    loading,
    refetch: refetchGroupData,
  } = useQuery<{ getMessageInGroup: IMyGroup }>(GET_MESSAGE_IN_GROUP, {
    variables: {
      groupId: active,
    },
  });

  useEffect(() => {
    setActive(activeGroupId);
    refetchGroupData();
  }, [activeGroupId]);

  const {
    data: dataNewMessage,
    error: subscriptionError,
    loading: subscriptionLooading,
  } = useSubscription<{ newMessage: IMessage }>(NEW_MESSAGES_SUBSCRIPTION, {
    variables: {
      groupId: activeGroupId,
    },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.newMessage) {
        setMessages(messages.concat(data.newMessage));
      }
    },
    shouldResubscribe: true,
  });

  const addMsg = (msg: IMessage): void => {
    // console.log('adding', msg);
    // setMessages(msgs => [...msgs, msg]);
  };

  useEffect(() => {
    // set messages onload
    if (dataGroup?.getMessageInGroup && !loading) {
      setMessages(dataGroup.getMessageInGroup.messages);
    }
  }, [loading, dataGroup]);

  useEffect(() => {
    //@ts-ignore
    socket.on(ACTIONS.SHARE_ROOMS);
    socket.emit(ACTIONS.SHARE_ROOMS);
    return () => {
      socket.off(ACTIONS.SHARE_ROOMS);
    };
  }, []);

  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isMediaError, setIsMediaError] = useState(false);

  const handleJoinRoom = async (): Promise<void> => {
    const { error } = await getMediaStream();
    setIsMediaError(!!error);
    if (error) return;

    setIsChatStarted(true);
    setRoomsIDS([...roomsIDS, activeGroupId.toString()]);
  };

  const handleLeaveRoom = (): void => {
    setIsChatStarted(false);
  };

  useEffect(() => {
    handleLeaveRoom();
  }, [context.user.id]);

  if (loading || !dataGroup) {
    return <Loading />;
  }

  return (
    <Wrapper
      style={{
        display: 'grid',
        gridTemplateRows: isChatStarted ? 'fit-content(100%) 1fr' : 'fit-content(100%) 1fr fit-content(100%)',
        background: '#D5D3D3',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid #EBEBEB',
      }}
    >
      <GroupInfo
        group={dataGroup.getMessageInGroup}
        refetchGroupData={refetchGroupData}
        isChatStarted={isChatStarted}
        handleJoinRoom={handleJoinRoom}
        handleLeaveRoom={handleLeaveRoom}
        isChatActive={roomsIDS.includes(activeGroupId.toString())}
      />

      {isChatStarted ? (
        <VisualConferenceRoom
          roomID={activeGroupId.toString()}
          handleLeaveRoom={handleLeaveRoom}
          members={dataGroup.getMessageInGroup.members}
        />
      ) : (
        <>
          <MessagesBlock messages={messages} />
          <MessageInput addMsg={addMsg} />
        </>
      )}

      <Snackbar
        open={isMediaError}
        autoHideDuration={1500}
        onClose={() => setIsMediaError(false)}
        message="Проверьте подключение камеры и микрофона"
      />
    </Wrapper>
  );
};

export default Chat;
