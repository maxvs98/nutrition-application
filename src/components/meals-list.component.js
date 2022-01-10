import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Meal = props => (
  <tr>
    <td>{props.meal.name}</td>
    <td>{props.meal.description}</td>
    <td>{props.meal.ingredients.map(function(ingredient) {
      return <option
        key={ingredient._id}
        value={ingredient._id}>{ingredient.name}
        </option>;
    })}</td>
    <td>
      <Link to={"/editmeal/"+props.meal._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMeal(props.meal._id) }}>delete</a>
    </td>
  </tr>
)

export default class MealsList extends Component {
  constructor(props) {
    super(props);

    this.deleteMeal = this.deleteMeal.bind(this)

    this.state = {meals: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/meals/')
      .then(response => {
        this.setState({ meals: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    axios.get('http://localhost:5000/ingredients/')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMeal(id) {
    axios.delete('http://localhost:5000/meals/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      meals: this.state.meals.filter(el => el._id !== id)
    })
  }

  mealList() {
    return this.state.meals.map(currentmeal => {
      return <Meal meal={currentmeal} deleteMeal={this.deleteMeal} key={currentmeal._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Meals</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Ingregients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.mealList() }
          </tbody>
        </table>
      </div>
    )
  }
}
