import React, { Component } from 'react'

export default class Total extends Component {
    render() {
        const { todaysFoods, onDelete } = this.props;

        return (
            <div>
                <ul>
                    {
                        todaysFoods.map((food) => {
                            return (
                                <li key={food.name}>
                                    {food.quantity} {food.name} = {food.quantity * food.calories} cal
                                    <button onClick={() => { onDelete(food.name) }}>Delete</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3>
                    Total:&nbsp;
                    {
                        todaysFoods.reduce((sum, food) => {
                            return sum + food.calories * food.quantity;
                        }, 0)
                    }
                    &nbsp;cal
                </h3>
            </div>
        )
    }
}
