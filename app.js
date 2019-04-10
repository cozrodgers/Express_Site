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

app.post('/contact/send', function(req, res){
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: 'coreyrodgers95@gmail.com',
            pass: "Intervention10254231095!!"
        }
    });

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
         
    transporter.sendMail(mailOptions, function(err, info) {

        if(err){
            console.log(err);
            res.redirect('/');
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
