import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Record = props => (
  <tr>
    <td>{props.record.username}</td>
    <td>{props.record.meals.map(function(meal) {
      return <option
        key={meal._id}
        value={meal._id}>{meal.name}
        </option>;
    })}</td>
    <td>{props.record.protein.toFixed(2)}</td>
    <td>{props.record.fat.toFixed(2)}</td>
    <td>{props.record.carbohydrate.toFixed(2)}</td>
    <td>{props.record.calories.toFixed(2)}</td>
    <td>{props.record.date.substring(0,10)}</td>
    <td>
      {props.record.protein/Object.keys(props.record.meals).length < 15 ? <div>потребляйте больше белка</div> : ''}
      {props.record.fat/Object.keys(props.record.meals).length < 15 ? <div>потребляйте больше жиров</div> : ''}
      {props.record.carbohydrate/Object.keys(props.record.meals).length < 20 ? <div>потребляйте больше углеводов</div> : ''}
      {props.record.calories/Object.keys(props.record.meals).length < 150 ? <div>потребляйте больше калорий</div> : ''}
    </td>
    <td>
      <Link to={"/editrecord/"+props.record._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRecord(props.record._id) }}>delete</a>
    </td>
  </tr>
)

export default class RecordsList extends Component {
  constructor(props) {
    super(props);

    this.deleteRecord = this.deleteRecord.bind(this)

    this.state = {records: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/records/')
      .then(response => {
        this.setState({ records: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRecord(id) {
    axios.delete('http://localhost:5000/records/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      records: this.state.records.filter(el => el._id !== id)
    })
  }

  recordList() {
    return this.state.records.map(currentrecord => {
      return <Record record={currentrecord} deleteRecord={this.deleteRecord} key={currentrecord._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Records</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Meals</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbohydrate</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Advice</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.recordList() }
          </tbody>
        </table>
      </div>
    )
  }
}
