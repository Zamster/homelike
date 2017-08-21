import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import axios from "axios";

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }

    // incomming socket io message
    this.props.socket.on('message', (obj) => {
      let messages = this.state.messages;
      messages = messages.concat(obj);
      this.setState({ messages: messages })
    })
    
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.selected != this.props.selected) {
      const channelid = nextProps.selected
      axios.get('/messages', {
        params: {
          id: channelid
        }
      }).then(res => {
        this.setState({ messages: res.data })
        // console.log(this.state.messages);
      })
    }
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.bottommsg);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    axios.get('/messages', {
      params: {
        id: this.props.selected
      }
    }).then(res => {
      this.setState({ messages: res.data })
      // console.log(this.state.messages);
    })
    const node = ReactDOM.findDOMNode(this.refs.bottommsg);
    node.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div className="message-list">
        {
          this.state.messages.map((message) =>
            <Message key={message.id} message={message} email={this.props.email}/>
          )
        }
        <div ref="bottommsg">
        </div>
      </div>
    );
  }
}

export default MessagesList;