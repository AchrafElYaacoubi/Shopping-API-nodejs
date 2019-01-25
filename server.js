// Server file where we create a express server and connect it to db 
// => use auth midlleware => connect it to Routes => set listen port
import express from "express";
import bodyParser from "body-parser";
const cookieParser = require('cookie-parser')
import mongoose from "mongoose";

import dbConfig from "./libs/dbConfig";
import auth from "./middlewares/authMiddleware";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import categoryRouter from "./routers/categoryRouter";
import commandeRouter from "./routers/commandeRouter";

import genderMiddleware from './middlewares/genderMiddleware'

const app = express();

// Use bodyParser middleware => json and urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

// Connected to the mongodb
mongoose.connect(dbConfig.url, {useNewUrlParser: true})
    .then(() => {''
        console.log('Successfully connected to the database')
    }).catch( err => {
        console.err('Could not connect to the database. Exiting now...', err);
        process.exit();
    } )

// Use auth middleware
app.use(auth)

// Importing the routes
// (baseUrl, router)
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/categories', categoryRouter)
app.use('/commandes', commandeRouter)


// A simple hello route 
app.get('/hello', genderMiddleware, (req, res) => {
    const prefix = (req.session.gender === 'male') ? 'Mr' : 'Miss'
    res.send(`Hello ${prefix} ${req.session.currentUser.username}`);
})

// start the application
app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

