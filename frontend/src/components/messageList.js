import React from 'react'

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
    let updateButton = <button
      onClick={() => this.toggleUpdate(message)}
      id='update'
    >
      Editar
    </button>

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
      updateButton = (<button
        onClick={() => this.sendUpdate(message)}
        id='send'
      >
        Atualizar
      </button>)
    }

    return (
      <li
        className='message'
        key={message._id}
      >
        { content }
        <br/>
        { message.date }
        <br/>
        <button 
          id='delete'
          onClick={() => this.props.handleDelete(message._id)}  
        >
          Deletar
        </button>
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