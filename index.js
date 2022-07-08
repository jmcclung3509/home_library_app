const express = require('express')
const router = require('./application')
const bodyParser = require('body-parser')
const env = require('dotenv')
const bookRouter = require('./application/book-routes')
const db = require('./db/db')
const flash = require("express-flash-messages")
const session = require('express-session')


const app = express();
const port = 3000;
app.use(flash())
app.use(
    session({
        secret: 'secret',
    })
)

env.config();
db.bootstrap();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use('/', router);

app.use('/books', bookRouter)

app.listen(port, (req, res) => {
    console.log('Server is listening')
})