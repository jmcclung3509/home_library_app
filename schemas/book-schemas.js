const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    id: { type: String, unique: true, required: true },
    bookName: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    pageCount: { type: Number },
    location: { type: String, required: true },
    // publisher: { type: String, required: true },
    // publishDate: { type: String },
    createdAt: { type: Date, default: Date.now },
    rating: {
        type: String,
        enum: ['👎', '👍', '👍👍'],
        default: '👍',
        required: true
    },
    genre: String,


})