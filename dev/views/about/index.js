import React from 'react';

export default class About extends React.Component {

    constructor() {
        super();
        this.state = { name: "Rest" };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({ name: "Active" });
    }

    render() {
        return (
            <h1 onClick={this.clickHandler}>
                {`Hello, you are in ${this.state.name} state!`}
            </h1>
        );
    }
}