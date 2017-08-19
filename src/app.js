import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './channels';
import MessageList from './message-list';
import Input from './input';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      selected:0
    }
    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    axios.get('/channels').then(res => {
      this.setState({ channels : res.data })
    })
  }

  handleSelected(id) {
    this.setState({selected:id})
  }
  
  render() {
    return (
      <div>
        <div className="chat-list">
          <div className="app-name">
            <h3>Chatroom</h3>
          </div>
          
          <Channels channels={this.state.channels} selected={this.state.selected} handleSelected={this.handleSelected}/>
        </div>

        <div className="chat-detail">
          <div className="header">
            {this.state.selected}
          </div>

          <div className="container-fluid">
            <MessageList selected={this.state.selected}/>        
            <Input selected={this.state.selected}/>
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
