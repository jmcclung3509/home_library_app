const express = require('express')
const router = require('./application')
const bodyParser = require('body-parser')
const env = require('dotenv')
const bookRouter = require('./application/book-routes')
const db = require('./db/db')
const flash = require("express-flash-messages")
const session = require('express-session')
const images = [{ image: "https://unsplash.com/photos/o4c2zoVhjSw" }]



const app = express();

const PORT = process.env.PORT || 5001;
app.use(flash())
app.use(
    session({
        secret: 'secret',
    })
)
if (process.env.NODE_ENV != "production") {
    env.config();
}
db.bootstrap();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.use(express.static('public'))

app.use('/', router);

app.use('/books', bookRouter)
// app.get("/", (req, res) => {
//     res.render("homepage", { images: images })

// })

app.listen(PORT, () => {
    console.log('Server is listening')
})