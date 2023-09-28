const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require('./models/taskModel')
const dotenv = require('dotenv')

const app = express()

app.use(cors())
app.use(express.json())

//seperate into moduls

mongoose.connect('mongodb://127.0.0.1:27017/todolist-mongo')

app.get('/get', async (req, res) => {
    TaskModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

//better end point
app.put('/:userId', async (req, res) => {
    const {userId} = req.params;

    TaskModel.findById({_id: userId})
        .then(task => {
            task.done = !task.done;
            return task.save();
        })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
    })

app.delete('/:userId', async (req, res) => {
    const {userId} = req.params;
    TaskModel.findOneAndDelete({_id: userId})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.post('/add', async (req, res) => {
    const task = req.body.task;
    TaskModel.create({
        taskDesc: task
    }).then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

app.listen(3001, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})