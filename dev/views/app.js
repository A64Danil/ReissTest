import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
//import { reducer, initialState } from "../store/reducers";
import reducer from "../store";

import Menu from "../components/Menu";
import Main from "../components/Main";

// Global CSS styles
import styles from "./global.scss";

export const ACTION_CHANGE_CURRENT_QUEST_ID = "CHANGE_CURRENT_QUEST_ID";
export const ACTION_CHANGE_QUEST_ANSWER = "CHANGE_QUEST_ANSWER";
export const ACTION_CHANGE_SHOW_QUEST = "CHANGE_SHOW_QUEST";

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
	console.log("Стор изменён", store.getState());
	console.log("Стор изменён", store.getState().userReducer.name);
	// В этом месте можно делать записи в куки
});

export default class App extends Component {
	constructor() {
		super();
		// if (!this.state) {
		// 	this.state = initialState;
		// }
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
				<Provider store={store}>
					<Main />
				</Provider>
			</div>
		);
	}
}
