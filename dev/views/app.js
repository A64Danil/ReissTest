import React, { Component } from "react";

import Menu from "../components/Menu";
import Main from "../components/Main";

// Global CSS styles
import styles from "./global.css";

const initialState = {
	testState: "initial State"
};

export default class App extends React.Component {
	constructor() {
		super();
		if (!this.state) {
			this.state = initialState;
		}
		this.state = { testState: "someValue", path: location.pathname };
	}

	componentDidMount() {
		console.log("hello after mount");
	}

	render() {
		console.log(this.state);
		return (
			<div className={styles["app-container"]} data-some="helllo">
				<Menu />
				<Main />
			</div>
		);
	}
}
//
// const App = () => (
//     <div className={styles["app-container"]}>
//         <Menu />
//         <Main />
//     </div>
// );
//
// export default App;
