import React from 'react';
import Message from './message';
import axios from "axios";

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    axios.get('/messages').then(res => {
      this.setState({ messages : res.data })
      console.log(this.state.messages);
    })
  }

  render() {
    return (
      <div className="message-list">
      {
        this.state.messages.map((message) =>
          <Message key={message.id} message={message}/>
        )
      }
      </div>
    );
  }
}

export default MessagesList;