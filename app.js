const port = 8000;
const express = require('express');
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static(__dirname + '/assets'));

//extract styles and scripts from the sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error at port: ${port}`);
    }
    else{
        console.log(`Server is up an running at port: ${port}`);
    }
});