import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './channels';
import MessageList from './message-list';
import Input from './input';
import axios from "axios";
import io from 'socket.io-client'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      selected: 1,
      socket : io()
    }
    this.state.socket.emit('subscribe', 1)
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    axios.get('/channels').then(res => {
      this.setState({ channels: res.data })
    })
  }

  handleSelected(id) {
    this.state.socket.emit('unsubscribe', this.state.selected)
    this.state.socket.emit('subscribe', id)

    this.setState({ selected: id })
  }

  componentWillUpdate(nextProps, nextState) {
    // this.state.socket.emit('unsubscribe', this.state.selected)
  }

  render() {
    return (
      <div>
        <div className="chat-list">
          <div className="app-name">
            <h3>Chatroom</h3>
          </div>

          <Channels channels={this.state.channels} selected={this.state.selected} handleSelected={this.handleSelected} />
        </div>

        <div className="chat-detail">
          <div className="header">
            {this.state.selected}
          </div>

          <div className="container-fluid">
            <MessageList selected={this.state.selected} socket={this.state.socket}/>
            <Input selected={this.state.selected} socket={this.state.socket}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
