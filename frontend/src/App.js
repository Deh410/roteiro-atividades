import React from 'react';
import MessageList from './components/MessageList/messageList'
import MessageForm from './components/MessageForm/messageForm'
import ErrorHandler from './components/ErrorHandler/errorHandler'
import axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

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
      id: id
    })
    .then(() => {
      this.setMessages(this.state.messages.filter(item => item._id !== id))
      this.getAllMessages()
      console.log('state', this.state.messages)
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
      <Container fluid="sm" id="app">
        <Row>
          <Col>
            <ErrorHandler
              error={this.state.error}
            />
            <MessageForm
              submitMessage={ this.submitMessage }
            />
            <MessageList
              messages={this.state.messages}
              handleDelete={ this.deleteMessage }
              sendUpdate={this.sendUpdate}
            />   
          </Col>
        </Row>
      </Container>
    );
  }  
}

export default MessageApp;
