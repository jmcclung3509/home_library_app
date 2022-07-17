const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        data: {
            "id": "1234567",
            "bookName": "Some Book",
            "description": "Book Description",
            "author": "Some Author",
            "pageCount": "Number of pages",
            "location": "Some location",
            "createdAt": Date.now,
            "status": "IN",
            "genre": "Book genre"
        }
    })
})

module.exports = router