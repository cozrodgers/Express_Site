//imports
const invoiceRoute = require('./invoiceRoute');
//set port name
const port = 3002;
//require dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//check db connection
mongoose.connect("mongodb://localhost:27017/CRED", { useNewUrlParser: true })
.then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

//initialize app
const app = express();

//set template engine setting
app.set('views', path.join(__dirname, 'views')); //read this folder for the views
app.set('view engine', 'jade'); //set template engine name


//specify middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/invoice', invoiceRoute);

//specify public static folder (css etc)
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.get('/', function(req, res){
    console.log('hello world');
    res.render('index',{title: 'welcome'});
   
})

app.get('/about', function(req, res){
    console.log('hello world');
    res.render('about');
   
})

app.get('/contact', function(req, res){
    console.log('hello world');
    res.render('contact');
   
})

app.get('/invoice', function(req, res){
    console.log('invoice page accessed');
    res.render('invoice');
   
})


//show invoices

app.post('/invoice/create', (req, res) => {

    db.collection('invoices').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/');
        console.log('saved to database')
      
        res.end();
   
      })
    })
 



//post method for contact
app.post('/contact/send', function(req, res){
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: 'coreyrodgers95@gmail.com',
            pass: "Intervention10254231095!!"
        }
    })    

//object to pass to the nodemailer
    let mailOptions = {
        from: 'Corey <coreyrodgers95@gmail.com>',
        to: 'coreyrodgers95@gmail.com',
        subject: "Website Submission",
        text: `You have used node mailer to make a post to yourself these are the following details
                    name:${req.body.name}
                    email:${req.body.email}
                    message:${req.body.message}`,
        html: `<p>You have used node mailer to make a post to yourself these are the following details</p>
                <ul>
                <li>${req.body.name}</li>
                <li>${req.body.email}</li>
                <li>${req.body.message}</li>
                
                </ul>`        

         };
//activate nodemailer
    transporter.sendMail(mailOptions, function(err, info) {

        if(err){
            console.log(err);
            res.redirect('/'); //redirect to home on error
        }
        else {
            console.log('message sent');
            res.redirect('/');
        }
        
    })

});



//launch server
app.listen(port);
console.log(`server is running on port ${port}`);
