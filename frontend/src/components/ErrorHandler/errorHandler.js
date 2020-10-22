import React from'react'
import './style.css'

class ErrorHandler extends React.Component {
  render() {
    let result
    if(this.props.error) {
      // if(this.props.error.response === undefined && this.props.error.response.data === 'No messages in database'){
      //   result = ``
      // } else {
      result = `Error: ${this.props.error.data}`
      // }
    }
    return <div id='error'>{result}</div>
  }
}

export default ErrorHandler