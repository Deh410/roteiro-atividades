import React from 'react';
import MessageList from './components/messageList'
import MessageForm from './components/messageForm'
import './App.css';

class MessageApp extends React.Component {
  render() {
    return (
      <div className="App">
        <MessageForm/>
        <MessageList/>      
      </div>
    );
  }  
}

export default MessageApp;
