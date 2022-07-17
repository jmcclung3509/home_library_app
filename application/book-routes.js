const express = require('express')
const Book = require('../models/book-module')
const router = express.Router();
const { v4: uuidv4 } = require("uuid")
const flash = require('express-flash-messages')

router.get('/', async (req, res) => {
    const response = await Book.find({})
    // res.redirect('/books');
    res.render("home", { data: response })

})
router.get('/delete/:id', async (req, res) => {
    const id = req.params['id'];
    let response = await Book.deleteOne({ id })
    req.flash("success", 'Record deleted');
    res.redirect('/books');

})
router.get('/edit/:id', async (req, res) => {
    const id = req.params['id'];
    const data = await Book.findOne({ id });

    res.render('edit-book', {
        data,
    });


})
router.post('/edit/:id', async (req, res) => {
    const id = req.params['id'];
    const payload = req.body;
    const response = await Book.updateOne({ id }, payload);
    // res.send(payload)
    res.redirect('/books');


});



router.get('/add-book', (req, res) => {
    res.render("add-book")
})
router.post('/', async (req, res) => {
    try {
        console.log(req.body)

        const newBook = new Book({ ...req.body, id: uuidv4() })
        const response = await newBook.save();
        req.flash("success", 'New book added');
        res.redirect('/books');
    } catch (error) {
        req.flash("fail", error.message);
        res.redirect('/books')

    }
})
module.exports = router