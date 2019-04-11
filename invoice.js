const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//defineScema
const Invoice = new Schema({
  invoiceName: {
    type: String
  },
  clientName: {
    type: String
},
  invoiceDesc: {
      type: String
  },
  materials: {
    type: String
},
  labour: {
    type: String
},
invoiceDate: {
    type: Date
},
},{
    collection: 'invoices'
});

module.exports = mongoose.model('Invoice', Invoice);