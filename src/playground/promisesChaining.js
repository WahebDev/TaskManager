require('../db/mongoose')
const User = require('../models/user');

User.findByIdAndUpdate('5f773acbca0b636200d1efc2', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})



