const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  user : { type: String, required: true },
  username : { type: String, required: true },
  meals : { type : Array , "default" : [] },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbohydrate: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
