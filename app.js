// set port of the app
const port = 8000;
// require essential modules 
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
// require the local strategy set in ./config/passport-local-strategy
const passportLocal = require('./config/passport-local-strategy');

// require passport and express-session for handling the session
const passport = require('passport');

const MongoStore = require('connect-mongo')(session);


// middlewares for parsing form data and cookies
app.use(express.urlencoded());
app.use(cookieParser());

// middleware for express-ejs-layouts to have a separate layout.ejs file in views
app.use(expressLayouts);
app.use(express.static(__dirname + '/assets'));

//extract styles and scripts from the sub pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine and views properties in the express dependency
app.set('view engine', 'ejs');
app.set('views', './views');

// setting up a middleware for creating session and setting some parameters on that session
app.use(session({

    //session name
    name: 'codial',

    // the key to use to encode and decode the cookie
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,

    // setting the cookie properties
    cookie: {

        // setting cookie age(in millisec) after which it expires
        maxAge: (1000 * 60 * 100)
    },

    // set up mongostore to store session cookie in the sessions collection
    store: new MongoStore({
        // url: 'mongodb://localhost/codial_development',
        mongooseConnection: db,
        ttl: 14 * 24 * 60 * 60, // 14 days
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb set ip ok!')
    })
}));


// starting passport
app.use(passport.initialize());

// telling passport to use the session defined above
app.use(passport.session());

// use the setAuthenticedUser middleware to put user data into response locals to be accessible by views
app.use(passport.setAuthenticatedUser);

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




 

