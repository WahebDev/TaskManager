const express = require("express");
const router = express.Router();
const Task = require("../models/task")

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return Task.status(404).send()
        }
        Task.send(task)

    } catch (error) {
        Task.status(500).send(error)
    }
});

router.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
    } catch (error) {
        Task.status(500).send(error)
    }
});

router.patch("/tasks:id", async (req, res) => {
    const updates = Object.keys(res.keys)
    const allowedUpdates = ['description', 'completed']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperations) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate(_id, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndRemove(_id)
        if (!task) {
            res.status(404).send()
        }
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;