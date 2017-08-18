import React from 'react';
import Channels from './channels';
import axios from "axios";

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: []
    }
  }

  componentDidMount() {
    axios.get('/channels').then(function (response) {

    })
  }

  render() {
    return (
      <div className="chat-list">
        <div className="app-name">
          <h3>test</h3>
        </div>

        <Channels />
      </div>
    );
  }
}

export default ChatList;