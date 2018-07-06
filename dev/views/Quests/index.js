import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import shortid from "shortid";
import { connect } from "react-redux";
import styles from "./slider.css";
import Button from "./Button";
import Select from "./Select";

import json from "../../model/quests.json";

console.log(json); // this will show the info it in firebug console

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

		this.answerAccept = this.answerAccept.bind(this);
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

	answerAccept(e) {
		let currentQuest = "id" + this.props.userReducer.currentQuestIDinStore;
		console.log(currentQuest);
		this.props.changeQuestAnswer(e.currentTarget.value, currentQuest);
	}

	render() {
		//store.dispatch(changeCurrentQuestID);
		let currentQuest = "id" + this.props.userReducer.currentQuestIDinStore;
		let currentQuestAnswer = this.props.answerReducer[currentQuest];
		console.log(currentQuestAnswer);
		//console.log(this.props.changeCurrentQuestID);
		return (
			<Fragment>
				<h1 onClick={this.clickHandler}>Тест Рейса. {this.state.name}</h1>

				<div>
					{QuestList(json, this.props.userReducer.currentQuestIDinStore)}
				</div>
				<div className={styles["slidecontainer"]}>
					<Select
						onChange={this.answerAccept}
						value={this.props.answerReducer[currentQuest]}
					/>
					<div className="questAnswer">Текущий ответ: {currentQuestAnswer}</div>
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
