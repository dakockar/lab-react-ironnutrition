import React, { Component } from 'react'


export default class FoodBox extends Component {

    state = {
        quantity: 1
    }

    handleQuantityChange = (event) => {

        this.setState({
            quantity: event.target.value
        })

        console.log(this.props.food);
    }

    render() {
        const { food } = this.props;

        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={food.image} alt={food.name} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{food.name}</strong> <br />
                                <small>{food.calories} cal</small>
                            </p>
                        </div>
                    </div>
                    <div className="media-right">
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    onChange={this.handleQuantityChange}
                                    className="input"
                                    type="number"
                                    value={this.state.quantity} />
                            </div>
                            <div className="control">
                                <button
                                    onClick={() => {
                                        this.props.onAdd(food, Number(this.state.quantity));
                                        // this.setState({ quantity: 1 });
                                    }}
                                    className="button is-info">+</button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}
