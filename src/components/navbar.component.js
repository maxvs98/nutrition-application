import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">NutritionApp</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Records</Link>
          </li>
          <li className="navbar-item">
          <Link to="/ingredientsList" className="nav-link">Ingredients</Link>
          </li>
          <li className="navbar-item">
          <Link to="/mealsList" className="nav-link">Meals</Link>
          </li>
          <li className="navbar-item">
          <Link to="/createrecord" className="nav-link">Create record</Link>
          </li>
          <li className="navbar-item">
          <Link to="/createingredient" className="nav-link">Create ingredient</Link>
          </li>
          <li className="navbar-item">
          <Link to="/createmeal" className="nav-link">Create meal</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
