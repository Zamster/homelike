import React from 'react';
import Gravatar from 'react-gravatar';
import axios from "axios";
import io from 'socket.io-client'

class Message extends React.Component {
  
  // new private channel
  newPrivate(email) {
    const socket = io()
    socket.emit('private', {
      from: email,
      to: this.props.email
    })
  }

  render() {

    let img;
    if (this.props.message.img != '') {
      img = (
        <p><img src={this.props.message.img} className="img-thumbnail"/></p>
      )
    }

    if (this.props.email == this.props.message.email) {
      return (
        <div className="row message">
          <div className="col-xs-8 col-sm-11 message-body right-align">
            <span className="email">{this.props.message.email}</span>
            <p>
              {this.props.message.message}
            </p>
            {img}
            <span className="ts">
              {this.props.message.ts}
            </span>
          </div>

          <div className="col-xs-4 col-sm-1">
              <Gravatar email={this.props.message.email} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="row message">
          <div className="col-xs-4 col-sm-1">
              <Gravatar email={this.props.message.email} />
              <p>
              <a href="#" onClick={this.newPrivate.bind(this, this.props.message.email)} > <img src="/static/img/msg.png" /> </a>
            </p>
          </div>
          <div className="col-xs-8 col-sm-11 message-body">
            <span className="email">{this.props.message.email}</span>
            <p>
              {this.props.message.message}
            </p>
            {img}
            <span className="ts">
              {this.props.message.ts}
            </span>
          </div>
        </div>
      )      
    }

  }
}

export default Message;