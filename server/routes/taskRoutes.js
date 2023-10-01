const router = require('express').Router();

const TaskModel = require('../models/taskModel');

router.post('/add', async (req, res) => {
    const task = req.body.taskDesc;
    TaskModel.create({
        taskDesc: task
    }).then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})


router.get('/get', async (req, res) => {
    TaskModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})

router.put('/:userId', async (req, res) => {
    const {userId} = req.params;

    TaskModel.findById({_id: userId})
        .then(task => {
            task.done = !task.done;
            return task.save();
        })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
})

router.delete('/:userId', async (req, res) => {
    const {userId} = req.params;
    TaskModel.findOneAndDelete({_id: userId})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err))
})


module.exports = router;