import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateRecord extends Component {
  constructor(props) {
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: '',
      users: [],
      meals: [],
      mealsLoad: [],
      protein: '',
      fat: '',
      carbohydrate: '',
      calories: '',
      date: new Date(),
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data,
            username: response.data[0].username,
            user: response.data[0]._id,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('http://localhost:5000/meals/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              mealsLoad: response.data,
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })

  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  handleAdd(e) {
    e.preventDefault();
    const mealsAllObjects = this.state.mealsLoad;
    this.setState({
      meals: this.state.meals.concat(mealsAllObjects.find(obj=>obj._id == [...document.getElementById('mealsSelect').selectedOptions].map(o => o.value)))
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const mealsAllObjects = this.state.mealsLoad;
    //console.log(ingredientsAllObjects);
    const mealsObjects = this.state.meals.map(function(meal) {
      //console.log(ingredientsAllObjects.find(obj=>obj._id == ingredient));
      return mealsAllObjects.find(obj=>obj._id == meal._id);
    })

    let protein = 0;
    let fat = 0;
    let carbohydrate = 0;
    let calories = 0;

    console.log(mealsObjects);

    mealsObjects.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        protein+=ingredient.protein;
        fat+=ingredient.fat;
        carbohydrate+=ingredient.carbohydrate;
        calories+=ingredient.calories;
      });
    });

    const record = {
      user: this.state.user,
      username: this.state.users.find(obj=>obj._id == this.state.user).username,
      meals: mealsObjects,
      protein: protein,
      fat: fat,
      carbohydrate: carbohydrate,
      calories: calories,
      date: this.state.date
    }

    console.log(record);

    axios.post('http://localhost:5000/records/add', record)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.user._id}
              onChange={this.onChangeUser}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user._id}
                    value={user._id}>{user.username}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Meals: </label>
          <div className="row-group">
            <select ref="userInput"
                required
                className="form-control"
                id="mealsSelect"
                >
                {
                  this.state.mealsLoad.map(function(meal) {
                    return <option
                      key={meal._id}
                      value={meal._id}>{meal.name}
                      </option>;
                  })
                }
            </select>
            <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
          </div>
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Record" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
