const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  message:{
    type:String
  },
 path:{
  type:String,
  // required:true

 },
 current_time:{
  type:String,
  required:true
 },
  uploadedBy: {
    type: [],
    ref: 'User',
    // required: true
  },
  sharedWith: {
    type: String,
    ref: 'User',
   
  }, 
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('File', fileSchema);



