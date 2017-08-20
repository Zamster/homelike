import React from 'react';
import Gravatar from 'react-gravatar';

class Message extends React.Component {
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
          <div className="col-md-11 message-body right-align">
            <span className="email">{this.props.message.email}</span>
            <p>
              {this.props.message.message}
            </p>
            {img}
            <span className="ts">
              {this.props.message.ts}
            </span>
          </div>

          <div className="col-md-1">
              <Gravatar email={this.props.message.email} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="row message">
          <div className="col-md-1">
              <Gravatar email={this.props.message.email} />
          </div>
          <div className="col-md-11 message-body">
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