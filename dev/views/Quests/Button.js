import React, { Fragment } from "react";

export default class Button extends React.Component {
	constructor() {
		super();
		this.changeCurrentQuestID = this.changeCurrentQuestID.bind(this);
	}

	changeCurrentQuestID(e) {
		let action = e.target.dataset.action;
		if (action === "next") {
			console.log("Уа!! Попали в кнопку некст!");
			this.setState({ currentQuestID: this.state.currentQuestID + 1 });
		} else if (action === "prev") {
			console.log("Уа!! Попали в кнопку прев!");
			this.setState({ currentQuestID: this.state.currentQuestID - 1 });
		}

		//this.setState({ currentQuestID: 1 });
	}

	render() {
		let action = this.props.action;
		// Возвращает DOM элемент. Например:
		if (action === "next") {
			return (
				<button data-action={action}>
					Далее, к вопросу №{this.props.curQuest + 1}
				</button>
			);
		} else if (action === "prev") {
			return (
				<button data-action={action}>
					Назад, к вопросу №{this.props.curQuest - 1}
				</button>
			);
		}
	}
}
