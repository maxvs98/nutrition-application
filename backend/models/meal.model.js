const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients : { type : Array , "default" : [] }
}, {
  timestamps: true,
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
