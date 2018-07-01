import React, { Component } from "react";
import { createStore } from "redux";

import Menu from "../components/Menu";
import Main from "../components/Main";

// Global CSS styles
import styles from "./global.css";

const initialState = {
	currentQuestIDinStore: 0,
	testState: "initial State"
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "CHANGE_CURRENT_QUEST_ID":
			return { ...state, currentQuestIDinStore: action.payload };
	}
	return state;
}

const store = createStore(reducer);

const changeCurrentQuestID = {
	type: "CHANGE_CURRENT_QUEST_ID",
	payload: 2
};

store.dispatch(changeCurrentQuestID);
console.log(store.getState());
export default class App extends Component {
	constructor() {
		super();
		if (!this.state) {
			this.state = initialState;
		}
		this.state = {
			testState: "this state in App class Component",
			path: location.pathname
		};
	}

	componentDidMount() {
		console.log("hello after mount 0^42");
	}

	render() {
		console.log(store.getState());
		return (
			<div className={styles["app-container"]} data-some="helllo">
				<Menu />
				<Main />
			</div>
		);
	}
}
