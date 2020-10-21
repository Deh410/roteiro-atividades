import React from 'react';
import MessageList from './components/messageList'
import MessageForm from './components/messageForm'
import ErrorHandler from './components/errorHandler'
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

  setError(error){
    this.setState({
      error: error
    })
  }

  setMessages(messages){
    this.setState({
      messages: messages
    })
  }

  getAllMessages = () => {
    axios.get(`${PORT}/`)
    .then((result) => {
      this.setMessages(result.data)
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then(() => {
      this.getAllMessages()
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  deleteMessage = (id) => {
    axios.delete(`${PORT}/delete/${id}`, {
      _id: id
    })
    .then((result) => {
      this.setMessages(result.data)
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  sendUpdate = (id, content) => {
    axios.put(`${PORT}/update/${id}`, {
      content: content
    })
    .then(() => {
      this.getAllMessages()
    })
    .catch((err) => {
      this.setError(err)
    })
  }

  render() {
    return (
      <div>
        <ErrorHandler
          error={this.state.error}
        />
        <MessageForm
          ref='messageFormRef'
          submitMessage={ this.submitMessage }
        />
        <MessageList
          messages={this.state.messages}
          handleDelete={ this.deleteMessage }
          sendUpdate={this.sendUpdate}
        />      
      </div>
    );
  }  
}

export default MessageApp;
