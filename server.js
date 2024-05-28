require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const expressEjsLayout= require('express-ejs-layouts');
const db = require('./config/mongo')

// Set EJS as templating engine 
app.set('view engine', 'ejs'); 
app.set('views','./views');

// use express layout
app.use(expressEjsLayout);
app.use('/assets', express.static('assets'));


app.use('/', require("./routes"));

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});