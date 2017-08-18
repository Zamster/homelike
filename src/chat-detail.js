import React from 'react';
import Messages from './messages';
import Input from './input';

class ChatDetail extends React.Component {
  render() {
    return (
      <div className="chat-detail">
        <Messages/>
        
        <Input />
      </div>
    );
  }
}

export default ChatDetail;