const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require('./models/todo')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todolist-mongo')

app.get('/get', async (req, res) => {
    TaskModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/:userid', (req, res) => {
    const {userid} = req.params;
    console.log(userid);

    TaskModel.findById({_id: userid})
        .then(task => {
            task.done = !task.done;
            return task.save();
        })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.delete('/:userid', async (req, res) => {
    const {userid} = req.params;
    TaskModel.findOneAndDelete({_id: userid})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', async (req, res) => {
    const task = req.body.task;
    TaskModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})