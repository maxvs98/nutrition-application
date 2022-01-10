import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateMeal extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      name: '',
      description: '',
      ingredients: [],
      ingredientsLoad: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ingredients/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            ingredientsLoad: response.data,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  /*onChangeIngredients(e) {
    this.setState({
      ingredients: [...e.target.selectedOptions].map(o => o.value)
    });
  }*/

  handleAdd(e) {
    e.preventDefault();
    const ingredientsAllObjects = this.state.ingredientsLoad;
    this.setState({
      ingredients: this.state.ingredients.concat(ingredientsAllObjects.find(obj=>obj._id == [...document.getElementById('ingredientsSelect').selectedOptions].map(o => o.value)))
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const ingredientsAllObjects = this.state.ingredientsLoad;
    //console.log(ingredientsAllObjects);
    const ingredientsObjects = this.state.ingredients.map(function(ingredient) {
      //console.log(ingredientsAllObjects.find(obj=>obj._id == ingredient));
      return ingredientsAllObjects.find(obj=>obj._id == ingredient._id);
    })

    const meal = {
      name: this.state.name,
      description: this.state.description,
      ingredients: ingredientsObjects,
    }

    console.log(meal);

    axios.post('http://localhost:5000/meals/add', meal)
      .then(res => console.log(res.data));

    window.location = '/mealsList';
  }

  render() {
    return (
    <div>
      <h3>Create New Meal</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Ingredients: </label>
          <div className="row-group">
            <select ref="userInput"
                required
                className="form-control"
                id="ingredientsSelect"
                onChange={this.onChangeIngredients}>
                {
                  this.state.ingredientsLoad.map(function(ingredient) {
                    return <option
                      key={ingredient._id}
                      value={ingredient._id}>{ingredient.name}
                      </option>;
                  })
                }
            </select>
            <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Meal" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
