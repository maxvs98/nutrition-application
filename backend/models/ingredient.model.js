const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbohydrate: { type: Number, required: true },
  calories: { type: Number, required: true },
}, {
  timestamps: true,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
