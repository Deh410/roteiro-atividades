import React from 'react'
import './style.css'
import { Button } from 'react-bootstrap'

class MessageList extends React.Component{
  constructor() {
    super()
    this.state = {
      editMode: {
        id: null,
        content: null
      }
    }
  }

  sendUpdate() {
    this.props.sendUpdate(this.state.editMode.id, this.refs.updateBox.value)
    this.toggleUpdate({
      id: null,
      content: null
    })
  }

  toggleUpdate(message){
    this.setState({
      editMode: {
        id: message._id,
        content: message.content
      }
    })
  }

  formatMessage(message){
    let content = message.content
    let updateButton = <Button id="button"
      onClick={() => this.toggleUpdate(message)}
    >
      Editar
    </Button>

    if(message._id === this.state.editMode.id) {
      content = (<textarea
        onChange={(e) => this.setState({
          editMode: {
            id: message._id,
            content: e.target.value
          }
        })}
        value={this.state.editMode.content}
        ref='updateBox'
        id='updateBox'
      >
      </textarea>)
      updateButton = (<Button id="button"
        onClick={() => this.sendUpdate(message)}
      >
        Atualizar
      </Button>)
    }

    return (
      <li
        className='message'
        key={message._id}
      >
        <b>{ content }</b>
        <br/>
        { new Date(message.date).toLocaleString('en-GB') }
        <br/>
        <Button 
          id="button"
          onClick={() => this.props.handleDelete(message._id)}  
        >
          Deletar
        </Button>
        { updateButton }
      </li>
    )
  }
  
  render() {
    if(this.props.messages){
      return(
        <div>
          <ul id="message_list">
            {
              this.props.messages.map(message => {
                  return this.formatMessage(message)
              })
            }
          </ul>
        </div>)
    } else {
      return(
        <ul id='message_list'>
          Sem mensagens
        </ul>
      )
    }
  }
}

export default MessageList