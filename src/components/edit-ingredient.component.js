import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditIngredient extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeProtein = this.onChangeProtein.bind(this);
    this.onChangeFat = this.onChangeFat.bind(this);
    this.onChangeCarbohydrate = this.onChangeCarbohydrate.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      protein: 0,
      fat: 0,
      carbohydrate: 0,
      calories: 0,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ingredients/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          protein: response.data.protein,
          fat: response.data.fat,
          carbohydrate: response.data.carbohydrate,
          calories: response.data.calories,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeProtein(e) {
    this.setState({
      protein: e.target.value
    })
  }

  onChangeFat(e) {
    this.setState({
      fat: e.target.value
    })
  }

  onChangeCarbohydrate(e) {
    this.setState({
      carbohydrate: e.target.value
    })
  }

  onChangeCalories(e) {
    this.setState({
      calories: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const ingredient = {
      name: this.state.name,
      protein: this.state.protein,
      fat: this.state.fat,
      carbohydrate: this.state.carbohydrate,
      calories: this.state.calories,
    }

    console.log(ingredient);

    axios.post('http://localhost:5000/ingredients/update/' + this.props.match.params.id, ingredient)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Ingredient</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group">
          <label>Protein: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.protein}
              onChange={this.onChangeProtein}
              />
        </div>
        <div className="form-group">
          <label>Fat: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.fat}
              onChange={this.onChangeFat}
              />
        </div>
        <div className="form-group">
          <label>Carbohydrate: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.carbohydrate}
              onChange={this.onChangeCarbohydrate}
              />
        </div>
        <div className="form-group">
          <label>Calories: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.calories}
              onChange={this.onChangeCalories}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit ingredient" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
