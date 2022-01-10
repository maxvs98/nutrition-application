const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//import ingridientMock from "./mocks/ingredient";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;//mongodb+srv:admin:121320@cluster0.7wito.mongodb.net/myFirstDatabase?retryWrites=true&w=majority;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

let Ingredient = require('./models/ingredient.model');
let Meal = require('./models/meal.model');
let User = require('./models/user.model');

const ingredientData = [
  {
    name: 'Морковь',
	protein: 1.3,
	fat: 0.1,
	carbohydrate: 7,
	calories: 33
  },
  {
    name: 'Яйца',
	protein: 12.7,
	fat: 11.5,
	carbohydrate: 0.7,
	calories: 157
  },
  {
    name: 'Рыба',
	protein: 17.5,
	fat: 0.6,
	carbohydrate: 7,
	calories: 75
  },
  {
    name: 'Курятина',
	protein: 18.2,
	fat: 18.4,
	carbohydrate: 0.7,
	calories: 241
  },
  {
    name: 'Творог',
	protein: 14,
	fat: 18,
	carbohydrate: 1.3,
	calories: 226
  },
  {
    name: 'Хлеб',
	protein: 6.5,
	fat: 1,
	carbohydrate: 40,
	calories: 190
  },
  {
    name: 'Сыр',
	protein: 23,
	fat: 30,
	carbohydrate: 7,
	calories: 371
  },
  {
    name: 'Огурцы',
	protein: 0.8,
	fat: 0,
	carbohydrate: 3,
	calories: 15
  },
  {
    name: 'Мёд',
	protein: 0.8,
	fat: 0,
	carbohydrate: 80,
	calories: 308
  },
  {
    name: 'Говядина',
	protein: 18.9,
	fat: 12.4,
	carbohydrate: 0,
	calories: 187
  }
];

const mealData = [
  {
    name: 'Салат Оливье',
  	description: 'Классическое новогоднее блюдо',
  	ingredients: [
      {
        name: 'Рыба',
    	protein: 17.5,
    	fat: 0.6,
    	carbohydrate: 7,
    	calories: 75
      },
      {
        name: 'Курятина',
    	protein: 18.2,
    	fat: 18.4,
    	carbohydrate: 0.7,
    	calories: 241
      },
      {
        name: 'Творог',
    	protein: 14,
    	fat: 18,
    	carbohydrate: 1.3,
    	calories: 226
      },
      {
        name: 'Хлеб',
    	protein: 6.5,
    	fat: 1,
    	carbohydrate: 40,
    	calories: 190
      },
      {
        name: 'Сыр',
    	protein: 23,
    	fat: 30,
    	carbohydrate: 7,
    	calories: 371
      },
      {
        name: 'Огурцы',
    	protein: 0.8,
    	fat: 0,
    	carbohydrate: 3,
    	calories: 15
      },
      {
        name: 'Мёд',
    	protein: 0.8,
    	fat: 0,
    	carbohydrate: 80,
    	calories: 308
      },
      {
        name: 'Говядина',
    	protein: 18.9,
    	fat: 12.4,
    	carbohydrate: 0,
    	calories: 187
      }
    ],
  },
  {
    name: 'Диетический завтрак',
  	description: 'Низкокалорийный приём пищи',
  	ingredients: [
      {
        name: 'Морковь',
    	protein: 1.3,
    	fat: 0.1,
    	carbohydrate: 7,
    	calories: 33
      },
      {
        name: 'Яйца',
    	protein: 12.7,
    	fat: 11.5,
    	carbohydrate: 0.7,
    	calories: 157
      },
      {
        name: 'Хлеб',
    	protein: 6.5,
    	fat: 1,
    	carbohydrate: 40,
    	calories: 190
      },
      {
        name: 'Сыр',
    	protein: 23,
    	fat: 30,
    	carbohydrate: 7,
    	calories: 371
      },
    ],
  },
  {
    name: 'Рыбное пюре',
  	description: 'Для любителей экзотической пищи',
  	ingredients: [
      {
        name: 'Яйца',
    	protein: 12.7,
    	fat: 11.5,
    	carbohydrate: 0.7,
    	calories: 157
      },
      {
        name: 'Рыба',
    	protein: 17.5,
    	fat: 0.6,
    	carbohydrate: 7,
    	calories: 75
      },
      {
        name: 'Курятина',
    	protein: 18.2,
    	fat: 18.4,
    	carbohydrate: 0.7,
    	calories: 241
      },
      {
        name: 'Творог',
    	protein: 14,
    	fat: 18,
    	carbohydrate: 1.3,
    	calories: 226
      }
    ],
  },
  {
    name: 'Суп из говядины',
  	description: 'Прекрасный суп',
  	ingredients: [
      {
        name: 'Огурцы',
    	protein: 0.8,
    	fat: 0,
    	carbohydrate: 3,
    	calories: 15
      },
      {
        name: 'Мёд',
    	protein: 0.8,
    	fat: 0,
    	carbohydrate: 80,
    	calories: 308
      },
      {
        name: 'Говядина',
    	protein: 18.9,
    	fat: 12.4,
    	carbohydrate: 0,
    	calories: 187
      }
    ],
  }
];

const userData = [
  {
    username: 'Виктор Александрович',
  },
  {
    username: 'Пётр Евгениевич',
  },
  {
    username: 'Алексей Михайлович',
  },
  {
    username: 'Павел Сергеевич',
  },
  {
    username: 'Кирилл Олегович',
  },
  {
    username: 'Анатолий Петрович',
  },
  {
    username: 'Дмитрий Федотович',
  },
  {
    username: 'Эдуард Захарович',
  },
];

connection.once('open', (err) => {
  if (err) { return console.error(err) }
  ingredientData.forEach((ingredient) => {
    ingredientObj = new Ingredient(ingredient);
    Ingredient.create(ingredientObj, function (err, doc) {
      if (err) { return console.error(err) }
    });
  });
  mealData.forEach((meal) => {
    mealObj = new Meal(meal);
    Meal.create(mealObj, function (err, doc) {
      if (err) { return console.error(err) }
    });
  });
  userData.forEach((user) => {
    userObj = new User(user);
    User.create(userObj, function (err, doc) {
      if (err) { return console.error(err) }
    });
  });
  console.log("MongoDB database connection established successfully");
});

const recordsRouter = require('./routes/records');
const usersRouter = require('./routes/users');
const ingredientsRouter = require('./routes/ingredients');
const mealsRouter = require('./routes/meals');

app.use('/records', recordsRouter);
app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/meals', mealsRouter);
/*
ingridientMock.forEach((ingredient) => {
  ingredient.save()
  .then(() => console.log('Ingredient added!'))
  .catch(err => console.log('Error: ' + err));
});*/


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
