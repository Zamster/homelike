import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }

    this.submitMessage = this.submitMessage.bind(this);
    this.textDidChange = this.textDidChange.bind(this);
  }

  textDidChange(e) {
    this.setState({ message: e.target.value })
  }

  submitMessage(e) {
    e.preventDefault();

    const message = this.state.message
    const channel = this.props.selected
    const socket = this.props.socket

    if (message) {
      const obj = {
        channel: channel,
        message: message
      }
      socket.emit('message', obj);
      this.setState({ message: '' })
    }
    
    return false
  }

  render() {
    return (
      <div className="input-group chat-input">
        <input type="text" className="form-control input-sm" value={this.state.message} onChange={this.textDidChange} />
        <span className="input-group-btn">
          <button className="btn" onClick={this.submitMessage}>Send</button>
        </span>
      </div>
    );
  }
}

export default Input;