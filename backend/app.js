import express from 'express'

const app = express()

app.listen(3001, function() {
  console.log('Connected')
})

export default app