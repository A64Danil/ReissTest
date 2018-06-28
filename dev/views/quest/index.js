import React from 'react';


// var json = require('../../model/quests.json');
import json from '../../model/quests.json';

console.log(json); // this will show the info it in firebug console


const QuestItem = props => <li data-key={props.index}>hey - {props.item.title}</li>;
const testVar = json;



const QuestList = (props) => {
    console.log(json);
    let questItems = props.map((item, index) =>
        <div data-key={index} key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
    );

    return questItems;
}

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
                <div>{QuestList(json)}</div>
            </div>
        );
    }
}
