import React from 'react';


var json = require('../../model/quests.json');

console.log(json); // this will show the info it in firebug console

export default class Quest extends React.Component {

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
            <div>
                <h1>Hello Kitty!</h1>
                <p>Here will be a qustion</p>
            </div>
        );
    }
}
