//you can run the code via typing npm run fv

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const router = require('./routes/router')
const {connectDB} = require('./config/dbConn');
const { isAuth } = require('./controllers/authController');
require('dotenv').config();

//API integration
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//app.use(expressjwt({secret: process.env.SECRET, algorithms: ["HS256"] }).unless({path:['/signup', '/login']}));
//app.use(isAuth);
app.use((req, res, next)=> {
    /*res.json({
        message: "API called"
    })*/
    console.log('API called')
})
app.use(cors);

app.use(router);

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



//mongoDB connection
connectDB();
mongoose.connection.once('open', () => {
    console.log('connected to mongoDb');
    app.listen(2000, () => {
        console.log('serving on port 2000');
    })
})
