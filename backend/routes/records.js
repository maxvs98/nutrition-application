const router = require('express').Router();
let Record = require('../models/record.model');

router.route('/').get((req, res) => {
  Record.find()
    .then(records => res.json(records))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const username = req.body.username;
  const meals = req.body.meals;
  const protein = Number(req.body.protein);
  const fat = Number(req.body.fat);
  const carbohydrate = Number(req.body.carbohydrate);
  const calories = Number(req.body.calories);
  const date = Date.parse(req.body.date);

  const newRecord = new Record({
    user,
    username,
    meals,
    protein,
    fat,
    carbohydrate,
    calories,
    date,
  });

  newRecord.save()
  .then(() => res.json('Record added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Record.findById(req.params.id)
    .then(record => res.json(record))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Record.findByIdAndDelete(req.params.id)
    .then(() => res.json('Record deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Record.findById(req.params.id)
    .then(record => {
      record.user = req.body.user;
      record.username = req.body.username;
      record.meals = req.body.meals;
      record.protein = Number(req.body.protein);
      record.fat = Number(req.body.fat);
      record.carbohydrate = Number(req.body.carbohydrate);
      record.calories = Number(req.body.calories);
      record.date = Date.parse(req.body.date);

      record.save()
        .then(() => res.json('Record updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
