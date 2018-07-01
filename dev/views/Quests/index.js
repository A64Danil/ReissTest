import React, { Fragment } from "react";
import { createStore } from "redux";
import Button from "./Button";

// var json = require('../../model/quests.json');
import json from "../../model/quests.json";

console.log(json); // this will show the info it in firebug console

function reducer(state, action) {
	switch (action.type) {
		case "CHANGE_CURRENT_QUEST_ID":
			return { ...state, currentQuestIDinStore: action.payload };
	}
	return state;
}
const store = createStore(reducer);

const changeCurrentQuestID = {
	type: "CHANGE_CURRENT_QUEST_ID",
	payload: 7
};

const QuestItem = props => (
	<li data-key={props.index}>
		{hey} - {props.item.title}
	</li>
);

const testVar = json;

//TODO: Delete this func
function ButtonOrig(props) {
	let action = props.action;
	// Возвращает DOM элемент. Например:
	if (action === "next") {
		return (
			<button data-action={action}>
				Далее, к вопросу №{props.curQuest + 1}
			</button>
		);
	} else if (action === "prev") {
		return (
			<button data-action={action}>
				Назад, к вопросу №{props.curQuest - 1}
			</button>
		);
	}
}

const QuestList = (props, sec) => {
	console.log(props[sec]);
	let tmpVal = props[sec];
	let questItems = (
		<div data-key={tmpVal.index} key={tmpVal.index}>
			<h3>{tmpVal.title}</h3>
			<p>heh {tmpVal.description}</p>
		</div>
	);
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
		this.changeCurrentQuestID = this.changeCurrentQuestID.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.setState({ name: "Active", nameTwo: "NameTwoActive" });
	}

	changeCurrentQuestID(e) {
		let action = e.target.dataset.action;
		if (action === "next") {
			console.log("Уа!! Попали в кнопку некст!");
			this.setState({ currentQuestID: this.state.currentQuestID + 1 });
		} else if (action === "prev") {
			console.log("Уа!! Попали в кнопку прев!");
			this.setState({ currentQuestID: this.state.currentQuestID - 1 });
		}

		//this.setState({ currentQuestID: 1 });
	}

	render() {
		console.log(this.state);

		store.dispatch(changeCurrentQuestID);
		console.log(store.getState());
		return (
			<Fragment>
				<h1 onClick={this.clickHandler}>Тест Рейса. {this.state.name}</h1>
				<div>{QuestList(json, this.state.currentQuestID)}</div>

				<div onClick={this.changeCurrentQuestID}>
					<Button action="next" curQuest={this.state.currentQuestID} />
				</div>
				<div onClick={this.changeCurrentQuestID}>
					<Button action="prev" curQuest={this.state.currentQuestID} />
				</div>
			</Fragment>
		);
	}
}
