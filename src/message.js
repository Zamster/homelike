import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div className="row">
          <div className="col-md-12">
                <div className="media">
                    <img className="d-flex mr-3" />
                        <div className="media-body">
                            <h5 className="mt-0">{this.props.message.id}</h5>
                            {this.props.message.text} - {this.props.message.ts}
                        </div>
                </div>
          </div> 
      </div>
    );
  }
}

export default Message;