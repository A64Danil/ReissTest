import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import shortid from "shortid";
import { connect } from "react-redux";
import styles from "./slider.css";
import Button from "./Button";
import Select from "./Select";

//import { createStore } from "redux";
//import { reducer } from "../../store/reducers";
//import QuestItem from "./QuestItem";

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

class Quest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "Rest",
			nameTwo: "One",
			currentQuestID: 0,
			questAnswer: 0
		};

		this.some = this.some.bind(this);
		this.changeCurrentQuestID = this.changeCurrentQuestID.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.setState({ name: "Active", nameTwo: "NameTwoActive" });
	}

	changeCurrentQuestID(e) {
		let action = e.target.dataset.action;
		if (this.props.userReducer.currentQuestIDinStore == json.length) {
			console.log("Дошли до последнего итема", json.length);
		}

		if (
			action === "next" &&
			this.props.userReducer.currentQuestIDinStore < json.length - 1
		) {
			console.log("Уа!! Попали в кнопку некст! Длина массива - " + json.length);
			this.props.changeCurrentQuestID(
				this.props.userReducer.currentQuestIDinStore + 1
			);
		} else if (
			action === "prev" &&
			this.props.userReducer.currentQuestIDinStore > 0
		) {
			console.log("Уа!! Попали в кнопку прев!");
			this.props.changeCurrentQuestID(
				this.props.userReducer.currentQuestIDinStore - 1
			);
		}
	}

	some(e) {
		this.props.changeQuestAnswer(e.currentTarget.value);
		console.log("Вариант ответа: " + e.currentTarget.value);
		this.setState({ questAnswer: e.currentTarget.value });
		console.log(this.state.questAnswer);
	}

	render() {
		//store.dispatch(changeCurrentQuestID);
		console.log(this.props);
		//console.log(this.props.changeCurrentQuestID);
		return (
			<Fragment>
				<h1 onClick={this.clickHandler}>Тест Рейса. {this.state.name}</h1>

				<div>
					{QuestList(json, this.props.userReducer.currentQuestIDinStore)}
				</div>
				<div className={styles["slidecontainer"]}>
					<Select onChange={this.some} />
					<div className="questAnswer" />
				</div>
				<Button
					action="prev"
					onClick={this.changeCurrentQuestID}
					curQuest={this.props.userReducer.currentQuestIDinStore}
					questLength={json.length}
				/>
				<Button
					onClick={this.changeCurrentQuestID}
					action="next"
					curQuest={this.props.userReducer.currentQuestIDinStore}
					questLength={json.length}
				/>
			</Fragment>
		);
	}
}
export default connect()(Quest);
