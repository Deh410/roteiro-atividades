import React from 'react';
import MessageList from './components/messageList'
import MessageForm from './components/messageForm'
import axios from 'axios'
import './App.css';

const PORT = 'http://localhost:3001'

class MessageApp extends React.Component {
  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
  }
  
  render() {
    return (
      <div>
        <MessageForm
          ref='messageFormRef'
          submitMessage={ this.submitMessage }
        />
        <MessageList/>      
      </div>
    );
  }  
}

export default MessageApp;
