const router = require('express').Router();

const Task_Model = require('../models/taskModel');

router.post('/add', async (req: any, res: any) => {
    const task: string = req.body.taskDesc;
    Task_Model.create({
        taskDesc: task
    }).then((result: any) => res.json(result))
    .catch((err: any) => res.status(500).json(err))
})


router.get('/get', async (req: any, res: any) => {
    Task_Model.find()
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(500).json(err))
})

router.put('/:userId', async (req: any, res: any) => {
    const {userId}: any = req.params;

    Task_Model.findById({_id: userId})
        .then((task: { done: boolean; save: () => any; }) => {
            task.done = !task.done;
            return task.save();
        })
        .then((result: any) => res.json(result))
        .catch((err: any) => res.status(500).json(err))
})

router.delete('/:userId', async (req: { params: any; }, res: any) => {
    const {userId}: any = req.params;
    Task_Model.findOneAndDelete({_id: userId})
    .then((result: any) => res.json(result))
    .catch((err: any) => res.status(500).json(err))
})


module.exports = router;