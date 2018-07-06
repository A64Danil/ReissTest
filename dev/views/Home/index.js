import React, { Fragment } from "react";

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = { name: "юзер" };
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler() {
		this.setState({ name: "(тут будет твоё имя)" });
	}

	render() {
		return (
			<Fragment>
				<h1 onClick={this.clickHandler}>{`Привет, ${this.state.name}!`}</h1>
				<h3>
					Переходи на страницу Quest, выбирай разные варианты ответа и они
					сохронятся
				</h3>
			</Fragment>
		);
	}
}
