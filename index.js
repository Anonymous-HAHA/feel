const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//dbconnect
const {databaseconnect}=require("./dbconfig");


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

// cors
app.use(cors({
    origin: '*'
}))
// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,limit: '50mb' }));

// routes
app.get('/',isAdmin,(req,res)=>{
    res.send("Welcome to the server");
});

app.use('/register',userRegister);
app.use('/login',userLogin);
app.use('/get/quotes',isValidUser,quote);
app.use('/add/quote',isAdmin,addquote);
app.use('/get/todaysquote',isValidUser,getTodaysQuote);
app.use('/edit/todaysquote',isAdmin,editTodaysQuote);
app.use('/get/name',isValidUser,getName);
app.use('/add/name',isAdmin,addName);


app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error'
      }
    });
  });

const PORT = process.env.PORT || 8800;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});