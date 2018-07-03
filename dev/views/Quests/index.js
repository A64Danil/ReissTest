import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import shortid from "shortid";
import { createStore } from "redux";
import Button from "./Button";
//import QuestItem from "./QuestItem";

// var json = require('../../model/quests.json');
import json from "../../model/quests.json";

console.log(json); // this will show the info it in firebug console
//TODO: Clear all this commented area
/*
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

const QuestItemOLD = props => (
	<li data-key={props.index}>
		{hey} - {props.item.title}
	</li>
);
*/
const QuestList = (props, index) => {
	console.log(props[index]);
	let tmpVal = props[index];
	let questItems = (
		<div data-key={"QuestID_" + index} key={index + shortid.generate()}>
			<h6>
				Вопрос {index + 1} из {props.length}
			</h6>
			<h3>{tmpVal.title}</h3>
			<p>{tmpVal.description}</p>
		</div>
	);
	return questItems;
};

export default class Quest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "Rest",
			nameTwo: "One",
			currentQuestID: 0
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
	}

	render() {
		//store.dispatch(changeCurrentQuestID);
		//console.log(store.getState());
		return (
			<Fragment>
				<h1 onClick={this.clickHandler}>Тест Рейса. {this.state.name}</h1>

				<div>{QuestList(json, this.state.currentQuestID)}</div>

				<Button
					action="prev"
					onClick={this.changeCurrentQuestID}
					curQuest={this.state.currentQuestID}
				/>
				<Button
					onClick={this.changeCurrentQuestID}
					action="next"
					curQuest={this.state.currentQuestID}
				/>
			</Fragment>
		);
	}
}
