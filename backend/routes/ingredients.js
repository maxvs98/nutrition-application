const router = require('express').Router();
let Ingredient = require('../models/ingredient.model');

router.route('/').get((req, res) => {
  Ingredient.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const protein = Number(req.body.protein);
  const fat = Number(req.body.fat);
  const carbohydrate = Number(req.body.carbohydrate);
  const calories = Number(req.body.calories);

  const newIngredient = new Ingredient({
    name,
    protein,
    fat,
    carbohydrate,
    calories,
  });

  newIngredient.save()
  .then(() => res.json('Ingredient added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Ingredient.findById(req.params.id)
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Ingredient.findById(req.params.id)
    .then(ingredient => {
      ingredient.name = req.body.name;
      ingredient.protein = Number(req.body.protein);
      ingredient.fat = Number(req.body.fat);
      ingredient.carbohydrate = Number(req.body.carbohydrate);
      ingredient.calories = Number(req.body.calories);

      ingredient.save()
        .then(() => res.json('Ingredient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
