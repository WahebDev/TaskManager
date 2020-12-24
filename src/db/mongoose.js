const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})



// const task = new Task({
//     description: 'I eat my burger'
// })

// task.save().then(() => {
//     console.log(task);
// }).catch((err => {
//     console.log(err);
// }))
