import React from "react";
import InputRange from "react-input-range";

export default class SelectBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestAnswer: 300,
			value: 300,
			percent: 0,
			allowDoubleClick: true
		};
	}

	render() {
		//console.log(this.state);
		return (
			<div>
				<InputRange
					maxValue={500}
					minValue={100}
					value={this.state.currentQuestAnswer}
					onChange={currentQuestAnswer => this.setState({ currentQuestAnswer })}
					onChangeComplete={value => console.log(value)}
				/>

				<div>Текущий ответ:{this.state.currentQuestAnswer}</div>
			</div>
		);
	}
}
