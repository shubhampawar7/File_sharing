const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 path:{
  type:String,
  required:true

 },
  uploadedBy: {
    type: String,
    ref: 'User',
    required: true
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
    default: Date.now
  }
});

module.exports = mongoose.model('File', fileSchema);



