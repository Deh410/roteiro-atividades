import React from 'react';
import MessageList from './components/messageList'
import MessageForm from './components/messageForm'
import axios from 'axios'
import './App.css';

const PORT = 'http://localhost:3001'

class MessageApp extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.getAllMessages()
  }

  getAllMessages = () => {
    axios.get(`${PORT}/`)
    .then((result) => {
      this.setState({
        messages: result.data
      })
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then(() => this.getAllMessages())
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
