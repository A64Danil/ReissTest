import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { changeCurrentQuestID } from "../../store/actions";

import Home from "../../views/Home";
import About from "../../views/About";
import Quest from "../../views/Quests";

import styles from "./style.css";

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			testMainComponentState: "someValueFrom Main.js",
			path: location.pathname
		};
	}

	componentWillMount() {
		//store.dispatch(changeCurrentQuestID(3));
		console.log("From main.js:");
		//this.state = { path: location.pathname };
		console.log(this.state);
		console.log(this.state.path);
	}

	render() {
		const { changeCurrentQuestID } = this.props;
		// В этом месте мы принимаем параметры от app.js
		console.log(this.props);
		// Здесь мы можем брать пропсы и вызывать из них функции
		changeCurrentQuestID(4);
		return (
			<main className={styles.main}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/about" component={About} />
					<Route path="/quests" component={Quest} />
					<Route path="*" component={Home} />
				</Switch>
			</main>
		);
	}
}

// Из стейта положить в пропсы
const putStateToProps = state => {
	return {
		currentQuestIDinStore: state.currentQuestIDinStore,
		testState: state.testState
	};
};

// Привязывает функции к пропсам
const putActionToProps = dispatch => {
	return {
		changeCurrentQuestID: bindActionCreators(changeCurrentQuestID, dispatch)
	};
};

export default connect(
	putStateToProps,
	putActionToProps
)(Main);

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
