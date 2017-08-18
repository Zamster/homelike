import React from 'react';
import MessageList from './message-list';
import Input from './input';

class ChatDetail extends React.Component {
  render() {
    return (
      <div className="chat-detail">
        <div className="container-fluid">
          <MessageList/>        
          <Input />
        </div>
      </div>
    );
  }
}

export default ChatDetail;