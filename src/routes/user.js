const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(404).send(error)
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const user = await findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body)
        console.log('ok');
        await user.save()
        return res.status(201).send()
    } catch (error) {
        res.status(500).send(error)
    }
});

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValideOperations = updates.every((update) => allowedUpdates.includes(update))
    if (!isValideOperations) {
        return res.status(400).send({error:'Invalid Updates!'})
    }
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])                   
        await user.save()
        //const user = await User.findByIdAndUpdate(_id, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;

