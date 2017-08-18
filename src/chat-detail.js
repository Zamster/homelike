import React from 'react';
import MessageList from './message-list';
import Input from './input';

class ChatDetail extends React.Component {
  render() {
    return (
      <div className="container-fluid chat-detail">
        <MessageList/>
        
        <Input />
      </div>
    );
  }
}

export default ChatDetail;