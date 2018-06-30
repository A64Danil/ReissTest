import React, { Fragment } from "react";

// var json = require('../../model/quests.json');
import json from "../../model/quests.json";

console.log(json); // this will show the info it in firebug console

const QuestItem = props => (
	<li data-key={props.index}>
		{hey} - {props.item.title}
	</li>
);

const testVar = json;

const nextBtn = props => <button>Далее, к вопросу №{props + 1}</button>;

const prevBtn = props => <button>Назад, к вопросу №{props - 1}</button>;

const QuestList = (props, sec) => {
	console.log(props[sec]);
	let tmpVal = props[sec];
	console.log("А тут будет второй параметр" + sec);

	let questItems = (
		<div data-key={tmpVal.index} key={tmpVal.index}>
			<h3>{tmpVal.title}</h3>
			<p>heh {tmpVal.description}</p>
		</div>
	);

	// let questItems = tmpVal.map((item, index) => (
	// 	<div data-key={index} key={index}>
	// 		<h3>{item.title}</h3>
	// 		<p>heh {item.description}</p>
	// 	</div>
	// ));

	return questItems;
};

export default class Quest extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "Rest",
			nameTwo: "One",
			currentQuestID: 1
		};
		this.nextQuestID = this.nextQuestID.bind(this);
		this.prevQuestID = this.prevQuestID.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.setState({ name: "Active", nameTwo: "NameTwoActive" });
	}

	nextQuestID(e) {
		this.setState({ currentQuestID: this.state.currentQuestID + 1 });
	}
	prevQuestID(e) {
		this.setState({ currentQuestID: this.state.currentQuestID - 1 });
	}

	changeCurrentQuestID(e) {
		if (false) {
			console.log("Уа!! Попали в кнопку некст!");
		}
		console.log(event.currentTarget);
		this.setState({ currentQuestID: 1 });
	}

	render() {
		console.log(this.state);

		return (
			<Fragment>
				<h1 onClick={this.clickHandler}>Hello Kitty! {this.state.name}</h1>
				<p>Here will be a qustion, {this.state.nameTwo}</p>
				<div>{QuestList(json, this.state.currentQuestID)}</div>
				<div onClick={this.nextQuestID}>
					{nextBtn(this.state.currentQuestID)}
				</div>
				<div onClick={this.prevQuestID}>
					{prevBtn(this.state.currentQuestID)}
				</div>
			</Fragment>
		);
	}
}
