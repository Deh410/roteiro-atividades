const config = {
  port: process.env.NODE_ENV === 'test' ? 3010:3001,
  db: process.env.NODE_ENV === 'test' ? 'mongodb://localhost/testMessages' : 'mongodb://localhost/messages'
}

module.exports = config