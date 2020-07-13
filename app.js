const port = 8000;
const express = require('express');
const app = express();


app.listen(port, function(err){
    if(err){
        console.log(`Error at port: ${port}`);
    }
    else{
        console.log(`Server is up an running at port: ${port}`);
    }
});