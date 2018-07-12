import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import {
	changeCurrentQuestID,
	changeQuestAnswer,
	changeShowQuest
} from "../../store/actions";

import Home from "../../views/Home";
import About from "../../views/About";
import Quest from "../../views/Quests";

import styles from "./style.sass";

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			testMainComponentState: "someValueFrom Main.js",
			path: location.pathname
		};
	}

	componentWillMount() {
		//this.state = { path: location.pathname };
		//console.log(this.state);
	}

	render() {
		//const { changeCurrentQuestID } = this.props;
		// В этом месте мы принимаем параметры от app.js
		console.log(this.props);
		// Здесь мы можем брать пропсы и вызывать из них функции
		//changeCurrentQuestID(4);
		return (
			<main className={styles.main}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route
						path="/quests"
						component={props => <Quest {...this.props} foo="lol" />}
					/>
					<Route path="*" component={Home} />
				</Switch>
			</main>
		);
	}
}

// Из стейта положить в пропсы
const putStateToProps = state => {
	return {
		// currentQuestIDinStore: state.currentQuestIDinStore,
		// questAnswers: state.questAnswers,
		// testQuestAnswers: state.testQuestAnswers,
		// testState: state.testState
		userReducer: state.userReducer,
		answerReducer: state.answerReducer,
		animateReducer: state.animateReducer
	};
};

// Привязывает функции к пропсам
const putActionToProps = dispatch => {
	return {
		changeCurrentQuestID: bindActionCreators(changeCurrentQuestID, dispatch),
		changeQuestAnswer: bindActionCreators(changeQuestAnswer, dispatch),
		changeShowQuest: bindActionCreators(changeShowQuest, dispatch)
	};
};

export default connect(
	putStateToProps,
	putActionToProps
)(Main);
