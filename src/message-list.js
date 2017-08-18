import React from 'react';
import Message from './message';

class MessagesList extends React.Component {
  render() {
    return (
      <div>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />

      </div>
    );
  }
}

export default MessagesList;