import React from "react";
import styles from "./SelectBar.css";

export default class SelectBar extends React.Component {
	constructor(props) {
		console.log("Привет из конструктора");
		super(props);
		this.state = {
			currentQuestAnswer: 250,
			percent: 0
		};

		this.answerAccept = this.answerAccept.bind(this);
		this.animate = this.animate.bind(this);
		this.animateWrapper = this.animateWrapper.bind(this);
		this.circ = this.circ.bind(this);
		this.bounce = this.bounce.bind(this);
		this.makeEaseOut = this.makeEaseOut.bind(this);
	}

	animate({ timing, draw, duration }) {
		let start = performance.now();

		requestAnimationFrame(function animate(time) {
			// timeFraction goes from 0 to 1
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			// calculate the current animation state
			let progress = timing(timeFraction);

			draw(progress); // draw it

			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}
		});
	}

	// обычный вариант
	bounce(timeFraction) {
		for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
			if (timeFraction >= (7 - 4 * a) / 11) {
				return (
					-Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
				);
			}
		}
	}

	// преобразователь в easeOut
	makeEaseOut(timing) {
		return function(timeFraction) {
			return 1 - timing(1 - timeFraction);
		};
	}

	circ(timeFraction) {
		return 1 - Math.sin(Math.acos(timeFraction));
	}

	animateWrapper() {
		this.animate({
			duration: 3000,
			timing: this.makeEaseOut(this.bounce),
			draw: function(progress) {
				brick.style.left = progress * 500 + "px";
				var percent = Math.round(100 * progress) + "%";
				perc.innerHTML = percent;
			}
		});
	}

	answerAccept(e) {
		//let currentQuest = "id" + this.props.userReducer.currentQuestIDinStore;
		let tpmVal = e.currentTarget.value;
		let value;
		let bigThis = this;
		console.log(bigThis.state);

		console.log(tpmVal);
		if (tpmVal < 150) {
			value = 100;
			console.log("Позиция 1");
		} else if (tpmVal < 250) {
			value = 200;
			console.log("Позиция 2");
		} else if (tpmVal < 350) {
			value = 300;
			console.log("Позиция 3");
		} else if (tpmVal <= 450) {
			value = 400;
			console.log("Позиция 4");
		} else {
			value = 500;
			console.log("Позиция 5");
		}
		this.animate({
			duration: 3000,
			timing: this.makeEaseOut(this.bounce),
			draw: function(progress) {
				brick.style.left = progress * 500 + "px";
				var percent = Math.round(value * progress) + "%";
				perc.innerHTML = percent;
				bigThis.setState({ currentQuestAnswer: percent });
			}
		});
		//this.setState({ currentQuestAnswer: value });
	}
	componentWillReceiveProps() {
		console.log("componentWillReceiveProps(");
		let value = 400;
		//this.setState({ currentQuestAnswer: value });
	}

	render() {
		console.log(this.state.currentQuestAnswer);
		var testStyle = {
			background: "green",
			width: "300px"
		};
		return (
			<div>
				<input
					type="range"
					min="100"
					step="1"
					max="500"
					//defaultValue="100"
					value={this.state.currentQuestAnswer}
					className={styles["slider"]}
					id="myRange"
					//onMouseUp={this.props.onChange}
					//onMouseUp={this.answerAccept}
					onChange={this.answerAccept}
					onTouchEnd={this.answerAccept}
				/>
				<div>Текущий ответ:{this.state.currentQuestAnswer}</div>
				<div id="perc" style={testStyle}>
					{this.state.percent}%
				</div>
				<div id="path">
					<div id="brick" onMouseUp={this.animateWrapper} />
				</div>
			</div>
		);
	}
}
