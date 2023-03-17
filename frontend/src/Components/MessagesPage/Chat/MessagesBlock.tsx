import React from 'react';
import { DivMessagePageScrollbar } from '../style';
import { MessagesBlockProps } from '../typings';
import Message from './Message';

const MessagesBlock: React.FC<MessagesBlockProps> = ({ messages }) => {
  return (
    <DivMessagePageScrollbar
      style={{
        overflowY: 'scroll',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
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

export default MessagesBlock;
