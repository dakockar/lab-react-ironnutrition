import React, { Component } from 'react'
import './App.css';
import foods from './foods.json';
import FoodBox from './components/FoodBox.js';
import AddForm from "./components/AddForm.js"
import Search from './components/Search';
import Total from './components/Total';


export default class App extends Component {

  state = {
    allFoods: foods,
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

    const newFood = {
      name,
      calories,
      image,
      quantity: 1
    }

    this.setState({
      allFoods: [newFood, ...this.state.allFoods],
      showForm: false
    })
  }

  handleSearch = (event) => {

    console.log(event.target.value);
    let searchTerm = event.target.value;

    // this filters the data we imported from json (foods array imported)
    let filteredFoods = foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

    this.setState({
      allFoods: filteredFoods
    })
  }

  handleAddTodaysFood = (food, quantity) => {

    const { todaysFoods } = this.state;

    let cloneTodaysFoods = JSON.parse(JSON.stringify(todaysFoods));

    for (let singleFood of cloneTodaysFoods) {
      if (singleFood.name === food.name) {
        singleFood.quantity += quantity;

        this.setState({
          todaysFoods: cloneTodaysFoods
        })
        return;
      }
    }

    let newFood = { ...food, quantity };

    this.setState({
      todaysFoods: [...todaysFoods, newFood]
    });

    // longer solution

    // const { todaysFoods } = this.state;
    // let cloneTodaysFoods = JSON.parse(JSON.stringify(todaysFoods));
    // let isFoodPresent = false;

    // for (let singleFood of cloneTodaysFoods) {
    //   if (singleFood.name === food.name) {
    //     singleFood.quantity += quantity;
    //     isFoodPresent = true;
    //     break;
    //   }
    // }

    // if (isFoodPresent) {
    //   this.setState({
    //     todaysFoods: cloneTodaysFoods
    //   })
    // }
    // else {
    //   let newFood = { ...food, quantity }

    //   this.setState({
    //     todaysFoods: [...todaysFoods, newFood]
    //   })
    // }
  }


  handleDelete = (foodName) => {
    let filteredTodaysFoods = this.state.todaysFoods.filter(food => food.name !== foodName);

    this.setState({
      todaysFoods: filteredTodaysFoods
    })
  }


  render() {
    const { allFoods, showForm, todaysFoods } = this.state;

    return (
      <div className="App">
        <h1>IronNutrition</h1>
        <Search handleChange={this.handleSearch} />
        <div className="columns">
          <div className="column">
            {
              showForm ? <AddForm onSubmit={this.handleSubmit} /> : <button onClick={this.handleShow}>Show</button>
            }
            {
              allFoods.map((food) => {
                return <FoodBox onAdd={this.handleAddTodaysFood} food={food} key={food.name} />
              })
            }
          </div>
          <div className="column">
            <h2>Today's Foods</h2>
            <Total todaysFoods={todaysFoods} onDelete={this.handleDelete} />
          </div>
        </div>
      </div>
    )
  }
}