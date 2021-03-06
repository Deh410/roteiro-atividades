import request from 'supertest'
import mongoose, { mongo } from 'mongoose'
import { expect } from 'chai'

import MessageApp from '../app.js'

let id

describe("Message API endpoint tests", function() {
  before(function (done) {
    mongoose.connect('mongodb://localhost/testMessages', { 
      useNewUrlParser: true, 
      useFindAndModify: false 
    }, function(){
      mongoose.connection.db.dropDatabase(function(){
        done()
      })
    })
  })


  it("posts a message", function(done) {
    let data = {
      content: "hi world"
    };
    const res = request(MessageApp)
    .post("/message")
    .send(data)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.content).to.equal('hi world');
      done()
    })
  })

  it("gets all messages", function(done){
    const res = request(MessageApp).get("/")
    res.expect(200)
    .end(function(err, res){
      if(err) {
        return done(err)
      }
      id = res.body[0]._id
      expect(res.body.length).to.equal(1)
      expect(res.body[0].content).to.equal('hi world')
      done()
    })
  })

  it("gets a single message", function(done) {
    const res = request(MessageApp)
    .get(`/message/${id}`)
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.content).to.equal("hi world")
      done()
    })
  })

  it("updates a message", function(done) {
    const data = {
      content: "Hello World"
    }
    const res = request(MessageApp)
    .put(`/update/${id}`)
    .send(data)
    .set("Accept", "application/json")

    res.expect(200)
    .end(function(err, res) {
      if(err) {
        return done(err)
      }
      expect(res.body.content).to.equal("Hello World")
      done()
    })
  })

  it("deletes a message", function(done) {
    const res = request(MessageApp)
    .delete(`/delete/${id}`)
    .set("Accept", "application/json")

    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.deletedCount).to.equal(1)
      done()
    })
  })
})

describe("Handle message api error correctly", function() {
  it("posts a message error", function(done) {
    const data = {
      content: ""
    }
    const res = request(MessageApp)
    .post("/message")
    .send(data)
    .set("Accept", "application/json")

    res.expect(404)
    .end(function(err, res) {
      if(err) {
        return done(err)
      }
      expect(res.body).to.equal("You can't post an empty message")
      done()
    })
  })

  it("gets all errors when no messages", function(done) {
    const res = request(MessageApp)
    .get("/")

    res.expect(404)
    .end(function(err, res) {
      if(err){
        return done(err)
      }
      expect(res.body).to.equal("No messages in database")
      done()
    })
  })

  it("errors if cant find single message", function(done){
    const res = request(MessageApp)
    .get(`/message/${id}`)

    res.expect(404)
    .end(function(err, res){
      if(err){
        return done(err)
      }
      expect(res.body).to.equal("Message not found in database")
      done()
    })
  })

  it("errors on bad update", function(done) {
    const data = {
      content: "Hello World"
    }
    const res = request(MessageApp)
    .put(`/update/${id}`)
    .send(data)
    .set("Accept", "application/json")

    res.expect(404)
    .end(function(err, res) {
      if(err){
        return done(err)
      }
      expect(res.body).to.equal('Message not found in database')
      done()
    })
  })

  it("errors deleting message that doesn't exist", function(done) {
    const data = {
      id: 0
    }

    const res = request(MessageApp)
    .delete(`/delete/${id}`)
    .send(data)
    .set("Acccept", "application/json")

    res.expect(404)
    .end(function(err, res) {
      if(err){
        return done(err)
      }
      expect(res.body).to.equal("Message not found in database")
      done()
    })
  })
})