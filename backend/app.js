import express from 'express'

const app = express()

app.get('/', function(req, res) {
  let result = messageApp.getAll()
  res.json(result)
})

app.listen(3001, function() {
  console.log('Connected')
})

export default app