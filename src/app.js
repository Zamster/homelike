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
      email: 'foo@bar.com',
      login: false,
      channels: [],
      selected: 0,
      socket: io(),
      hideList: false
    }

    // subscribe channel 0 by default
    this.state.socket.emit('subscribe', this.state.selected)

    // private channel
    this.state.socket.on('private', (obj) => {
      axios.get('/channels', {
        params: {
          email: this.state.email
        }
      }).then(res => {
        this.setState({ channels: res.data })
      })
    })
  }

  componentDidMount() {

  }

  handleSelected(id) {
    // subscribe to different channels
    this.state.socket.emit('unsubscribe', this.state.selected)
    this.state.socket.emit('subscribe', id)

    this.setState({ selected: id })
  }

  emailDidChange(e) {
    this.setState({ email: e.target.value })
  }

  loginDidClick(e) {
    e.preventDefault();
    
    // logged in
    this.setState({ login: true })
    this.state.socket.emit('login', this.state.email)
    
    // get participated channels
    axios.get('/channels', {
      params: {
        email: this.state.email
      }
    }).then(res => {
      this.setState({ channels: res.data })
    })
  }

  toggleList() {
    this.setState({ hideList: !this.state.hideList })
  }

  render() {
    if (!this.state.login) {
      return (
        <div className="container-fluid login">
          <form className="login-box">
            <h2>Please sign in</h2>
            <input id="inputEmail" className="form-control" placeholder="Email address" type="email" value={this.state.email} onChange={this.emailDidChange.bind(this)} />
            <button className="btn btn-login btn-block" onClick={this.loginDidClick.bind(this)}>Sign in</button>
          </form>
        </div>
      )
    } else {
      const listHide = this.state.hideList ? "list-hide" : ""
      const detailFull = this.state.hideList ? "detail-full" : ""
      
      return (
        <div>
          <div id="chat-list" className={listHide}>
            <div className="app-name">
              <Gravatar email={this.state.email} />
              <h4>{this.state.email}</h4>
            </div>

            <Channels channels={this.state.channels} selected={this.state.selected} handleSelected={this.handleSelected.bind(this)} email={this.state.email}/>
          </div>

          <div id="chat-detail" className={detailFull}>
            <div className="header">
              <button type="button" className="btn btn-toggle" onClick={this.toggleList.bind(this)}><span>Toggle</span></button>
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
