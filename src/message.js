import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div className="row message">
        <div className="col-md-1">
          title
        </div>
        <div className="col-md-11">
          <p>
            {this.props.message.message}
          </p>
          <span className="ts">
            {this.props.message.ts}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;