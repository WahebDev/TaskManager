require('../db/mongoose')
const Task = require('../models/task')

Task.findByIdAndDelete('5f7e2a6ebe2d332b2343ad7b').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false })
}).then((task) => {
    console.log(task);
}).catch((e) => {
    console.log(e);
})

const deleteTaskAndCount = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5f7e3e6a8ca48b5030c94e4e').then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})



