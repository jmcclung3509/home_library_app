const mongoose = require('mongoose')
const bookSchema = require('../schemas/book-schemas')

module.exports = mongoose.model('Book', bookSchema);