import request from 'supertest'
import { expect } from 'chai'

import MessageApp from '../app.js'

describe("Message API endpoint tests", function() {
  it.only("gets from backend messages", function(done){
    const res = request(MessageApp).get("/")
    res.expect([ { content: 'hi world', id: 1 } ])
    res.expect(200)
    .end(function(err, res){
      if(err) {
        return done(err)
      }
      expect(res.body.length).to.equal(1)
      done()
    })
  })
})