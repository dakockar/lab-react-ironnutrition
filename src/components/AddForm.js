import React, { Component } from 'react'

export default class AddForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} className="add-form">
                <input name="name" type="text" placeholder="enter food name" />
                <input name="calories" type="number" placeholder="enter calories" />
                <input name="image" type="text" placeholder="enter image URL" />
                <button type="submit">Submit</button>
            </form>
        )
    }
}
