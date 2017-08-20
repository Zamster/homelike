import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './channels';
import MessageList from './message-list';
import Input from './input';
import axios from "axios";
import io from 'socket.io-client'
import Gravatar from 'react-gravatar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'zamster@163.com',
      login: false,
      channels: [],
      selected: 1,
      socket: io()
    }
    this.state.socket.emit('subscribe', 1)
    this.handleSelected = this.handleSelected.bind(this);
    this.loginDidClick = this.loginDidClick.bind(this);
    this.emailDidChange = this.emailDidChange.bind(this);
  }

  componentDidMount() {

  }

  handleSelected(id) {
    this.state.socket.emit('unsubscribe', this.state.selected)
    this.state.socket.emit('subscribe', id)

    this.setState({ selected: id })
  }

  emailDidChange(e) {
    this.setState({ email: e.target.value })
  }

  loginDidClick(e) {
    e.preventDefault();
    this.setState({ login: true })

    axios.get('/channels', {
      params: {
        email: this.state.email
      }
    }).then(res => {
      this.setState({ channels: res.data })
    })

  }

  render() {
    if (!this.state.login) {
      return (
        <div className="login">
          <form className="login-box">
            <h2>Please sign in</h2>
            <input id="inputEmail" className="form-control" placeholder="Email address" type="email" value={this.state.email} onChange={this.emailDidChange} />
            <button className="btn btn-login btn-block" onClick={this.loginDidClick}>Sign in</button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <div className="chat-list">
            <div className="app-name">
              <Gravatar email={this.state.email} />
              <h4>{this.state.email}</h4>
            </div>

            <Channels channels={this.state.channels} selected={this.state.selected} handleSelected={this.handleSelected} email={this.state.email}/>

            <hr/>
          </div>

          <div className="chat-detail">
            <div className="header">
              You are in Channel {this.state.selected}
            </div>

            <div className="container-fluid">
              <MessageList selected={this.state.selected} socket={this.state.socket} email={this.state.email}/>
              <Input selected={this.state.selected} socket={this.state.socket} email={this.state.email}/>
            </div>
          </div>
        </div>
      )
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
