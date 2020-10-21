// import fs from 'fs'
// import path from 'path'
import mongoose from 'mongoose'

let MessageSchema = mongoose.Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now
  }
})

// Error handling
MessageSchema.post('validate', function(doc, next){
  if(!doc.content) {
    next('You can\'t post an empty message')
  }
  next()
})

MessageSchema.post('findOneAndUpdate', function(doc, next){
  if(!doc) {
    next('Message not found in database')
  }
  next()
})

MessageSchema.post('findOne', function(doc, next){
  if(!doc) {
    next('Message not found in database')
  }
  next()
})

MessageSchema.post('find', function(doc, next){
  if(doc.length === 0) {
    next('No messages in database')
  }
  next()
})

MessageSchema.post('deleteOne', function(doc, next){
  if(doc.deletedCount === 0) {
    next('Message not found in database')
  }
  next()
})

let MessageModel = mongoose.model('messages', MessageSchema)

export default MessageModel

// function newId(array) {
//   if(array.length > 0) {
//     return array[array.length - 1].id + 1
//   } else {
//     return 1
//   }
// }


// class MessageApp {
//   constructor(filepath) {
//     this.filepath = filepath
//     this.messages = filepath ? this.readFromJson() : []
//   }

//   post(content) {
//     if (content) {
//       let item = {
//         id: newId(this.messages),
//         content: content,
//         date: new Date()
//       }
//       this.messages.push(item)
//       this.writeToJson()
//       return this.messages
//     } else if (!content) {
//       return []
//     }
//   }

//   get(id){
//     return this.messages.filter(message => message.id == id)[0]
//   }

//   getAll() {
//     return this.messages
//   }

//   update(id, update){
//     let index = this.messages.findIndex(message => message.id == id)
//     if (index >= 0) {
//       this.messages[index].content = update
//       this.writeToJson()
//       return this.messages
//     } else {
//       return []
//     }
//   }

//   delete(id) {
//     let index = this.messages.findIndex(message => message.id == id)
//     if (index >= 0) {
//       this.messages = this.messages.filter(message => message.id != id)
//       this.writeToJson()
//       return this.messages
//     } else{
//       return "Message not found in database"
//     }
//   }

//   readFromJson() {
//     return JSON.parse(fs.readFileSync(__dirname+path.normalize(this.filepath), "utf-8", (err, data) => {
//       if(err) throw err
//     })
//     )
//   }

//   writeToJson() {
//     if(this.filepath) {
//       const jsonItem = JSON.stringify(this.messages)
//       fs.writeFileSync(__dirname+path.normalize(this.filepath), jsonItem, (err) => {
//         if (err) throw err       
//       })
//     }
//   }
// }

// export default MessageApp