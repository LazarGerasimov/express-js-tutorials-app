const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    //TODO add User validation per asignment
    username: { type: String, required: true, unique: true, minlength: [5, 'Username must be at least 5 chars long'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {  // allows setting unique in the Schema
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

module.exports = User;