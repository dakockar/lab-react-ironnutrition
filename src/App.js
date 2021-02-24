import React, { Component } from 'react'
import './App.css';
import foodsJson from './foods.json';
import FoodBox from './components/FoodBox.js';
import AddForm from "./components/AddForm.js"
import Search from './components/Search';
import Total from './components/Total';


export default class App extends Component {

  state = {
    foods: foodsJson,
    clonedFoods: foodsJson,
    showForm: false,
    todaysFoods: []
  }


  handleShow = () => {
    this.setState({
      showForm: true
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let calories = event.target.calories.value;
    let image = event.target.image.value;

    if (!name || !image || !calories.slice(-4)) {
      console.log("please fill in the fields");
      return;
    }

    console.log(name, calories, image);

    const food = {
      name,
      calories,
      image,
      quantity: 1
    }

    this.setState({
      foods: [food, ...this.state.foods],
      clonedFoods: [food, ...this.state.clonedFoods],
      showForm: false
    })
  }

  handleChange = (event) => {
    const { foods } = this.state;

    console.log(event.target.value);
    let searchTerm = event.target.value;

    let filteredFoods = foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

    this.setState({
      clonedFoods: filteredFoods
    })
  }

  handleAddItem = (food, quantity) => {
    console.log(food);
    // food.quantity = quantity;

    let newFood = { ...food, quantity }

    this.setState({
      todaysFoods: [...this.state.todaysFoods, newFood]
    })
  }

  render() {
    const { clonedFoods, showForm, todaysFoods } = this.state;

    return (
      <div className="App">
        <h1>IronNutrition</h1>
        <Search handleChange={this.handleChange} />
        <div className="columns">
          <div className="column">
            {
              showForm ? <AddForm onSubmit={this.handleSubmit} /> : <button onClick={this.handleShow}>Show</button>
            }
            {
              clonedFoods.map((food, index) => {
                return <FoodBox handleAddItem={this.handleAddItem} food={food} key={index} />
              })
            }
          </div>
          <div className="column">
            <h2>Today's Foods</h2>
            <Total todaysFoods={todaysFoods} />
          </div>
        </div>
      </div>
    )
  }
}