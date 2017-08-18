import React from 'react';
import Channels from './channels';

class ChatList extends React.Component {
  render() {
    return (
      <div className="chat-list">
        <div className="app-name">
          <h3>Foobar</h3>
        </div>

        <Channels />
      </div>
    );
  }
}

export default ChatList;