import React from 'react'
import { Button } from 'react-bootstrap'
import './style.css'

class MessageForm extends React.Component {
  constructor() {
    super()
    this.state = {
      currentMessage: ''
    }
  }

  changeMessageValue(change) {
    this.setState({
      currentMessage: change
    })
  }

  processSubmit(e){
    e.preventDefault()
    this.props.submitMessage(this.state.currentMessage)
    this.changeMessageValue('')
  }

  render() {
    return(
      <div>
        <h3>Roteiro de atividades</h3>
        <form 
          id="message_form"
          onSubmit={(e) => this.processSubmit(e)}  
        >
        <textarea 
          id='message_box'
          onChange={(e) => this.changeMessageValue(e.target.value)}
          placeholder='Insira aqui a atividade'
          value={ this.state.currentMessage }
        ></textarea>
        <br/>
        <Button 
          id="submit"
          type="submit"
          name="Submit"
        >Enviar
        </Button> 
      </form>
    </div>
    )
  }
}

export default MessageForm;