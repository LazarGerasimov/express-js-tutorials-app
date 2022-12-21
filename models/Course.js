const { Schema, mode, Types } = require('mongoose');

const URL_PATTERN = /https?:\/\/./i;

const courseSchema = new Schema({
    title: { type: String, required: true, minlength: [4, 'Title must be at least 4 chars long'] },
    description: {
        type: String, required: true,
        minlength: [20, 'Title must be at least 20 chars long'],
        maxlength: [50, 'Title cannot be more than 50 chars long']
    },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
        }
    },
    duration: { type: String, required: true },
    createdAt: { type: String, required: true },
    users: { type: [Types.ObjectId], ref: 'User', default: [] }
});

courseSchema.index({ title: 1 }, {      // to support search functionality
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;