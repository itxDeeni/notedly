//Require the mongoose library
const mongoose = require('mongoose');

//define the notes database Schema
const noteSchema = new mongoose.Schema(
  {
    content:{
      type:String,
      required:true
    },
    author:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

//define the 'Note' model with the Schema
const Note = mongoose.model('Note', noteSchema);
//Export the module.exports
module.exports = Note;
