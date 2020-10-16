import React from 'react'
import { render } from '@testing-library/react'

class MessageList extends React.Component{
  render() {
    return(
      <ul
        id="message_list"
      >
        <li>message</li>
      </ul>
    )
  }
}

export default MessageList