import React from'react'

class ErrorHandler extends React.Component {
  render() {
    let result
    if(this.props.error) {
      if(this.props.error.response.data === 'No messages in database'){
        result = ``
      } else {
      result = `Error: ${this.props.error.response.data}`
      }
    }
    return <div id='error'>{result}</div>
  }
}

export default ErrorHandler