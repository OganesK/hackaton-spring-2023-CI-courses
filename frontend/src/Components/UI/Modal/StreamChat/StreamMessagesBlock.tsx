/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
import React from 'react';
import { DivMessagePageScrollbar } from '../../../MessagesPage/style';
import { MessagesBlockProps } from './graphql/typings';
import Message from './Message';

const StreamMessagesBlock: React.FC<MessagesBlockProps> = ({ messages }) => {
  return (
    <DivMessagePageScrollbar
      style={{
        overflowY: 'scroll',
        minHeight: 250,
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: '14 24 14 24',
      }}
    >
      <div>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </DivMessagePageScrollbar>
  );
};

export default StreamMessagesBlock;
