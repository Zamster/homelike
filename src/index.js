import React from 'react';
import ReactDOM from 'react-dom';
import ChatList from './chat-list';
import ChatDetail from './chat-detail';

class App extends React.Component {
  render() {
    return (
        <div>
          <ChatList/>
          <ChatDetail/>
        </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
