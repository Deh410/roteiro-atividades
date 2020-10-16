import React from 'react'

class MessageForm extends React.Component {
  render() {
    return(
      <form id="message_form">
      <textarea id='message_box'></textarea>
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