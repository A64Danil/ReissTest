import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../../views/Home";
import About from "../../views/About";
import Quest from "../../views/Quests";

import styles from "./style.css";

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = { testMainCompState: "someValue", path: location.pathname };
	}

	componentWillMount() {
		console.log("From main.js:");
		//this.state = { path: location.pathname };
		console.log(this.state);
		console.log(this.state.path);
	}

	render() {
		return (
			<main className={styles.main}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/quests" component={Quest} />
				</Switch>
			</main>
		);
	}
}

// const Main = () => (
//     <main className={styles.main}>
//         <Switch>
//             <Route exact path="/" component={Home}/>
//             <Route path="/about" component={About}/>
//             <Route path="/quests" component={Quest}/>
//         </Switch>
//     </main>
// )
//
// export default Main;
