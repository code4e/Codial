// set port of the app
const port = 8000;
// require essential modules 
const express = require('express');
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

// middleware for express-ejs-layouts to have a separate layout.ejs file in views
app.use(expressLayouts);
app.use(express.static(__dirname + '/assets'));

//extract styles and scripts from the sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine and views properties in the express dependency
app.set('view engine', 'ejs');
app.set('views', './views');

// use a middleware to route all the requests to ./routes/index.js file
app.use('/', require('./routes/index'));


// listen on port 8000
app.listen(port, function(err){
    if(err){
        console.log(`Error at port: ${port}`);
    }
    else{
        console.log(`Server is up an running at port: ${port}`);
    }
});