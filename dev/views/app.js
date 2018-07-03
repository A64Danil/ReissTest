import React, { Component } from "react";
import { connect, Provider } from "react-redux";
import { createStore, bindActionCreators } from "redux";
import { reducer } from "../store/reducers";

import Menu from "../components/Menu";
import Main from "../components/Main";

// Global CSS styles
import styles from "./global.css";

export const ACTION_CHANGE_CURRENT_QUEST_ID = "CHANGE_CURRENT_QUEST_ID";

const store = createStore(reducer);
console.log(store.getState());

// const WrappedMainComponent = connect(
// 	putStateToProps,
// 	putActionToProps
// )(Main);

export default class App extends Component {
	/* constructor() {
		super();
		if (!this.state) {
			this.state = initialState;
		}
		this.state = {
			testState: "this state in App class Component",
			path: location.pathname
		};
	} */

	// componentDidMount() {
	// 	console.log("hello after mount 0^42");
	// }

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
