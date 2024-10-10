const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// dbconnect
const { databaseconnect } = require("./dbconfig");

// dbconnection
databaseconnect();

//Routes
const userRegister = require('./router/register/userRegister');
const userLogin = require('./router/login/userLogin');
const isValidUser = require('./middlewares/isValidUser');
const isAdmin = require('./middlewares/isAdmin');
const quote = require('./router/quote/getQuotes');
const addquote = require('./router/quote/addQuote');
const getTodaysQuote = require('./router/quote/getDailyQuote');
const editTodaysQuote = require('./router/quote/editDailyQuote');
const getName = require('./router/user/getName');
const addName = require('./router/user/addName');
const getPoems = require('./router/poem/getPoems');
const addPoem = require('./router/poem/addPoem');
const changePassword = require('./router/user/changePassword');

// cors
app.use(cors({
    origin: '*'
}));

// app.use(cors({
//     origin: 'https://frontend-mauve-tau.vercel.app',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
// }));

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Set a timeout for the server (in milliseconds)
const TIMEOUT = 300000; // 5 minutes (300,000 milliseconds)
const server = app.listen(8800, () => {
    console.log(`Server is running`);
});

// Increase timeout
server.setTimeout(TIMEOUT);

// routes
app.get('/', isAdmin, (req, res) => {
    res.send("Welcome to the server");
});

app.use('/register', userRegister);
app.use('/login', userLogin);
app.use('/get/quotes', isValidUser, quote);
app.use('/add/quote', isAdmin, addquote);
app.use('/get/todaysquote', isValidUser, getTodaysQuote);
app.use('/edit/todaysquote', isAdmin, editTodaysQuote);
app.use('/get/name', isValidUser, getName);
app.use('/add/name', isAdmin, addName);
app.use('/get/poems', isValidUser, getPoems);
app.use('/add/poem', isAdmin, addPoem);
app.use('/change/password', isValidUser, changePassword);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});
