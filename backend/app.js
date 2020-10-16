import express from 'express'
import MessageApp from './lib/model'

const app = express()

let messageApp = new MessageApp("/\///json/\//testMessages.json")

app.get('/', function(req, res) {
  let result = messageApp.getAll()
  res.json(result)
})

app.listen(3001, function() {
  console.log('Connected')
})

export default app