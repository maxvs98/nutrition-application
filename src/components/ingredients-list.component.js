import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ingredient = props => (
  <tr>
    <td>{props.ingredient.name}</td>
    <td>{props.ingredient.protein}</td>
    <td>{props.ingredient.fat}</td>
    <td>{props.ingredient.carbohydrate}</td>
    <td>{props.ingredient.calories}</td>
    <td>
      <Link to={"/editingredient/"+props.ingredient._id}>edit</Link> | <a href="#" onClick={() => { props.deleteIngredient(props.ingredient._id) }}>delete</a>
    </td>
  </tr>
)

export default class IngredientsList extends Component {
  constructor(props) {
    super(props);

    this.deleteIngredient = this.deleteIngredient.bind(this)

    this.state = {ingredients: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ingredients/')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteIngredient(id) {
    axios.delete('http://localhost:5000/ingredients/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      ingredients: this.state.ingredients.filter(el => el._id !== id)
    })
  }

  ingredientList() {
    return this.state.ingredients.map(currentingredient => {
      return <Ingredient ingredient={currentingredient} deleteIngredient={this.deleteIngredient} key={currentingredient._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Ingredients</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbohydrate</th>
              <th>Calories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.ingredientList() }
          </tbody>
        </table>
      </div>
    )
  }
}
