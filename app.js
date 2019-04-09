const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const port = 3000;
//initialize app

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    console.log('hello world');
    res.send(`<h1>we are running on port ${port}</h1>`);
   
});

app.listen(port);
console.log(`server is running on port ${port}`);
