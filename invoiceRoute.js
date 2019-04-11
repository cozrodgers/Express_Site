const express = require('express');
const InvoiceRouter = express.Router();

const invoice = require('./Invoice');

InvoiceRouter.route('/create').post(function (req, res) {
  const Invoice = new invoice(req.body);
  
  Invoice.save()
    .then(user => {
      res.redirect('/');
      console.log(req.body);
   
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = InvoiceRouter;