const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        require: true
      },
    password: String,
    email: String,
    createdAt: String,
});

module.exports = model('User', userSchema);