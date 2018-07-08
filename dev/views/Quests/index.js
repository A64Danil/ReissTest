import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import shortid from "shortid";
import { connect } from "react-redux";

import NavButton from "../../components/Quest/NavButton/NavButton";
import stylesBtn from "../../components/Quest/NavButton/NavButton.scss";
import styles from "../../components/Quest/SelectBar/SelectBar.css";
import SelectBar from "../../components/Quest/SelectBar/SelectBar";
import QuestList from "../../components/Quest/QuestList/QuestList";

import json from "../../model/quests.json";

console.log(json); // this will show the info it in firebug console

class Quest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

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
		let tpmVal = e.currentTarget.value;
		let value;
		if (tpmVal < 150) {
			value = 100;
			console.log("Позиция 1");
		} else if (tpmVal < 250) {
			value = 200;
			console.log("Позиция 2");
		} else if (tpmVal <= 350) {
			value = 300;
			console.log("Позиция 3");
		} else if (tpmVal <= 450) {
			value = 400;
			console.log("Позиция 4");
		} else {
			value = 500;
			console.log("Позиция 5");
		}
		/*
		*0 - 124
		*125-249
		*250-274
		*375-500
		*

		* */
		console.log(tpmVal);
		this.props.changeQuestAnswer(value, currentQuest);
	}

	render() {
		//store.dispatch(changeCurrentQuestID);
		let currentQuest = "id" + this.props.userReducer.currentQuestIDinStore;
		let currentQuestAnswer = this.props.answerReducer[currentQuest];
		console.log(currentQuestAnswer);
		//console.log(this.props.changeCurrentQuestID);
		return (
			<Fragment>
				<h4 onClick={this.clickHandler}>Тест Рейса</h4>

				<QuestList
					list={json}
					index={this.props.userReducer.currentQuestIDinStore}
					currentAnswer={this.props.answerReducer[currentQuest]}
				/>
				<div className={styles["slidecontainer"]}>
					<SelectBar
						onChange={this.answerAccept}
						value={this.props.answerReducer[currentQuest]}
					/>
					<div className={styles.questAnswer}>
						Текущий ответ: {currentQuestAnswer}
					</div>
					<div className={stylesBtn["buttonWrapper"]}>
						<NavButton
							action="prev"
							onClick={this.changeCurrentQuestID}
							curQuest={this.props.userReducer.currentQuestIDinStore}
							questLength={json.length}
						/>
						<NavButton
							onClick={this.changeCurrentQuestID}
							action="next"
							curQuest={this.props.userReducer.currentQuestIDinStore}
							questLength={json.length}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}
export default connect()(Quest);
