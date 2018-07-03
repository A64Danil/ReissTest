import React, { Fragment } from "react";

export default class Button extends React.Component {
	render() {
		let action = this.props.action;
		// Возвращает DOM элемент. Например:
		if (action === "next") {
			return (
				<button onClick={this.props.onClick} data-action={action}>
					Далее, к вопросу №{this.props.curQuest + 2}
				</button>
			);
		} else if (action === "prev") {
			return (
				<button onClick={this.props.onClick} data-action={action}>
					Назад, к вопросу №{this.props.curQuest}
				</button>
			);
		}
	}
}
