import React from "react";

export default class NavButton extends React.Component {
	render() {
		let action = this.props.action;
		let questIdMaxValue = this.props.questLength - 1;
		// Возвращает DOM элемент. Например:
		if (action === "next" && this.props.curQuest == questIdMaxValue) {
			console.log("Вы достигли дна");
			return null;
		} else if (action === "next") {
			return (
				<button onClick={this.props.onClick} data-action={action}>
					Далее, к вопросу №{this.props.curQuest + 2}
				</button>
			);
		} else if (action === "prev" && this.props.curQuest == 0) {
			return null;
		} else if (action === "prev") {
			return (
				<button onClick={this.props.onClick} data-action={action}>
					Назад, к вопросу №{this.props.curQuest}
				</button>
			);
		}
	}
}
