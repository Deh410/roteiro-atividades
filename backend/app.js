import express from 'express'
import MessageApp from './lib/model'

const app = express()

let messageApp
if (process.env.npm_lifecycle_event == "test"){
  messageApp = new MessageApp("/\///json/\//testMessages.json")  
} else {
  messageApp = new MessageApp("/\///json/\//messages.json")
}

app.get('/', function(req, res) {
  let result = messageApp.getAll()
  res.json(result)
})

app.listen(3001, function() {
  console.log('Connected')
})

export default app