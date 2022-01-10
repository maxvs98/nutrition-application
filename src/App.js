import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import RecordsList from "./components/records-list.component";
import EditRecord from "./components/edit-record.component";
import CreateRecord from "./components/create-record.component";
import CreateUser from "./components/create-user.component";
import IngredientsList from "./components/ingredients-list.component";
import EditIngredient from "./components/edit-ingredient.component";
import CreateIngredient from "./components/create-ingredient.component";
import MealsList from "./components/meals-list.component";
import EditMeal from "./components/edit-meal.component";
import CreateMeal from "./components/create-meal.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={RecordsList} />
      <Route path="/editrecord/:id" component={EditRecord} />
      <Route path="/createrecord" component={CreateRecord} />
      <Route path="/ingredientslist" exact component={IngredientsList} />
      <Route path="/editingredient/:id" component={EditIngredient} />
      <Route path="/createingredient" component={CreateIngredient} />
      <Route path="/mealslist" exact component={MealsList} />
      <Route path="/editmeal/:id" component={EditMeal} />
      <Route path="/createmeal" component={CreateMeal} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
