const express = require('express')
const Book = require('../models/book-module')
const router = express.Router();
const { v4: uuidv4 } = require("uuid")
const flash = require('express-flash-messages');
const req = require('express/lib/request');
const { acceptsEncodings } = require('express/lib/request');

router.get('/', async (req, res) => {
    const response = await Book.find({})
    // res.redirect('/books');
    res.render("home", { data: response })

})


router.get('/search', async (req, res) => {

    const data = await Book.find({
        $or: [
            { author: { '$regex': req.query.dsearch } },
            { description: { '$regex': req.query.dsearch } },
            { bookName: { '$regex': req.query.dsearch } }
        ]
    })
    console.log(data)

    res.render('search', { data });
})
router.post('/search', async (req, res) => {

    res.redirect('/search?dsearch=' + req.body.dsearch);
});



router.post('/search', async (req, res) => {

    res.redirect('/search?dsearch=' + req.body.dsearch);
});
// router.get("/search-delete/:id", async (req, res) => {
//     const id = req.params['id'] || req.query['id']
//     console.log(id)
//     let response = await Book.deleteOne({ id })
//     res.redirect('/books')
// })

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