import React from 'react';
import axios from "axios";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      message: ''
    }
  }

  textDidChange(e) {
    this.setState({ message: e.target.value })
  }

  keyDidPress(e) {
    if (e.key == 'Enter') {
      this.sendMessage()
    }
    return false;
  }

  btnDidClick(e) {
    e.preventDefault();
    this.sendMessage()
  }

  fileDidSelect(e) {
    const file = e.target.files[0]

    var data = new FormData();
    data.append('image', file);
    data.append('name', file.name);

    axios.post('/upload', data).then(res => {
      this.setState({ url: res.data })
      // sent automatically
      this.sendMessage()
    })
  }

  sendMessage(e) {
    const socket = this.props.socket

    const obj = {
      channel: this.props.selected,
      email: this.props.email,
      url : this.state.url,
      message: this.state.message
    }

    socket.emit('message', obj);
    this.setState({ message: '', url : '' })

    return false
  }

  render() {
    return (
      <div className="input-group chat-input">
        <input type="text" className="form-control input-sm" value={this.state.message} onKeyPress={this.keyDidPress.bind(this)} onChange={this.textDidChange.bind(this)} />
        <button className="btn btn-green" onClick={this.btnDidClick.bind(this)}>Send</button>
        <input type="file" name="image" className="form-control-file btn-file" onChange={this.fileDidSelect.bind(this)} />
      </div>
    );
  }
}

export default Input;