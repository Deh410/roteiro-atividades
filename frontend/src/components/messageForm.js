import React from 'react'

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
      <form 
        id="message_form"
        ref='formRef'
        onSubmit={(e) => this.processSubmit(e)}  
      >
      <textarea 
        id='message_box'
        onChange={(e) => this.changeMessageValue(e.target.value)}
        value={ this.state.currentMessage }
      ></textarea>
      <br/>
      <button 
        id="submit"
        type="submit"
        name="Submit"
      >Submit
      </button> 
    </form>
    )
  }
}

export default MessageForm;