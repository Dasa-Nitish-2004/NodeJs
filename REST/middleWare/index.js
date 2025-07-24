const express = require('express');
const fs = require('fs');

app = express();

app.use((req,res,next)=>{
    console.log("performing some middleware operations -- level 1");
    // if next() the it goes to next middleware
    // if not next() then it will not go to next middleware and stuck here
    // res.send("if any problem occurs abort"); // this will stop the request and response cycle
    next();
});
app.use((req,res,next)=>{
    console.log("performing some middleware operations -- level 2");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

