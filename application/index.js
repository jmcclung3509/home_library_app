const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        data: {
            "bookName": "King Arthur"
        }
    })
})

module.exports = router