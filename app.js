//require dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

//set port name
const port = 3000;

//initialize app
const app = express();

//set template engine setting
app.set('views', path.join(__dirname, 'views')); //read this folder for the views
app.set('view engine', 'jade'); //set template engine name

//specify middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//specify public static folder (css etc)
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.get('/', function(req, res){
    console.log('hello world');
    res.render('index',{title: 'welcome'});
   
});

app.get('/about', function(req, res){
    console.log('hello world');
    res.render('about');
   
});

app.get('/contact', function(req, res){
    console.log('hello world');
    res.render('contact');
   
});



//launch server
app.listen(port);
console.log(`server is running on port ${port}`);
