import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <div className="input-group chat-input">
        <input type="text" className="form-control input-sm" />
        <span className="input-group-btn">
          <button className="btn">Send {this.props.selected}</button>
        </span>
      </div>
    );
  }
}

export default Input;