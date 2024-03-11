const mongoose = require('mongoose')

exports.connectMongoose = () =>{
    mongoose
        .connect("mongodb://localhost:27017/TodoDatabase")
        .then((e) => console.log('connected to mongoDB: '+ e.connection.host ))
        .catch((e) => console.log(e))
}

const userSchema = new mongoose.Schema({
    name: String,
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: String
})

const todoSchema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    isDone: Boolean
})

exports.userInfo = mongoose.model("userInfo",userSchema)
exports.todoItem = mongoose.model("todoItem",todoSchema)