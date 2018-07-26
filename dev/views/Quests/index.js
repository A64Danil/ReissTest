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
		this.state = {
			btnDirection: "next",
			currentQuestID: 0
			//currentQuestAnswer: 100
		};

		this.answerAccept = this.answerAccept.bind(this);
		this.changeQuest = this.changeQuest.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		console.log("Начальный стейт: " + this.state);
	}

	changeQuest(e) {
		let action = e.target.dataset.action;
		let current = this.state.currentQuestID;
		if (action === "next") {
			current++;
			this.setState({ btnDirection: "next", currentQuestID: current });
			console.log("Current state: " + current);
		} else if (action === "prev") {
			current--;
			this.setState({ btnDirection: "prev", currentQuestID: current });
			console.log("Current state: " + current);
		}
	}

	answerAccept(e) {
		//let currentQuest = "id" + this.props.userReducer.currentQuestIDinStore;
		let tpmVal = e.currentTarget.value;
		let value;
		// Эта часть вызывает перерисовку

		console.log(tpmVal);
		if (tpmVal < 150) {
			value = 100;
			console.log("Позиция 1");
		} else if (tpmVal < 250) {
			value = 200;
			console.log("Позиция 2");
		} else if (tpmVal < 350) {
			value = 300;
			console.log("Позиция 3");
		} else if (tpmVal <= 450) {
			value = 400;
			console.log("Позиция 4");
		} else {
			value = 500;
			console.log("Позиция 5");
		}
		this.setState({ currentQuestAnswer: value });
		/*
		*0 - 124
		*125-249
		*250-274
		*375-500
		*/
	}

	render() {
		//store.dispatch(changeCurrentQuestID);
		let currentQuest = "id" + this.props.userReducer.currentQuestIDinStore;
		//let currentQuestAnswer = this.props.answerReducer[currentQuest];
		//console.log(currentQuestAnswer);
		console.log(this.state);
		//console.log(this.props.changeCurrentQuestID);
		return (
			<Fragment>
				<h4>Тест Рейса</h4>
				<QuestList
					list={json}
					//index={this.props.userReducer.currentQuestIDinStore}
					index={this.state.currentQuestID}
					btnDirection={this.state.btnDirection}
					//currentAnswer={this.props.answerReducer[currentQuest]}
					//currentAnswer={this.state.currentQuestAnswer}
					answerAccept={this.answerAccept}
				/>

				<div className={stylesBtn["buttonWrapper"]}>
					<NavButton
						action="prev"
						//onClick={this.changeCurrentQuestID}
						onClick={this.changeQuest}
						// curQuest={this.props.userReducer.currentQuestIDinStore}
						curQuest={this.state.currentQuestID}
						questLength={json.length}
					/>
					<NavButton
						action="next"
						//onClick={this.changeCurrentQuestID}
						onClick={this.changeQuest}
						// curQuest={this.props.userReducer.currentQuestIDinStore}
						curQuest={this.state.currentQuestID}
						questLength={json.length}
					/>
				</div>
			</Fragment>
		);
	}
}
export default connect()(Quest);
