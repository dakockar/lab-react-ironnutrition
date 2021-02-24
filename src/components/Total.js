import React, { Component } from 'react'

export default class Total extends Component {
    render() {
        const { todaysFoods } = this.props;

        return (
            <div>
                <ul>
                    {
                        todaysFoods.map((food, index) => {
                            return (
                                <li key={index}>
                                    {food.quantity} {food.name} = {food.quantity * food.calories} cal
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    Total:
                    {
                        todaysFoods.reduce((sum, food) => {
                            return sum + food.calories * food.quantity;
                        }, 0)
                    }
                </div>
            </div>
        )
    }
}
