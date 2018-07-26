import React from "react";
import styles from "./SelectBar.css";

export default class SelectBar extends React.Component {
	constructor(props) {
		console.log("Привет из конструктора");
		super(props);
		this.state = {
			currentQuestAnswer: 300,
			percent: 0,
			allowDoubleClick: true
		};

		this.answerSelecting = this.answerSelecting.bind(this);
		this.animate = this.animate.bind(this);
		this.helper = this.helper.bind(this);
		this.circ = this.circ.bind(this);
		this.bounce = this.bounce.bind(this);
		this.newBounce = this.newBounce.bind(this);
		this.makeEaseOut = this.makeEaseOut.bind(this);
		this.animateAfterSelect = this.animateAfterSelect.bind(this);
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
	bounceORIG(timeFraction) {
		for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
			if (timeFraction >= (7 - 4 * a) / 11) {
				return (
					-Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
				);
			}
		}
	}
	bounce(timeFraction) {
		for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
			if (timeFraction >= (7 - 4 * a) / 11) {
				return (
					-Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
				);
			}
		}
	}
	newBounce(x, timeFraction) {
		return (
			Math.pow(2, 15 * (timeFraction - 1)) *
			Math.cos(((20 * Math.PI * x) / 3) * timeFraction)
		);
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

	//потом можно удалить
	helper() {
		console.log("звали?");
	}

	animateAfterSelect(e) {
		if (!this.state.allowDoubleClick) {
			// If it was called from select - disallow double click
			this.setState({ allowDoubleClick: true });
			return null;
		}

		let tpmVal = e.currentTarget.value;
		console.log("я запускаюсь во время маусАП, tpmVal=" + tpmVal);
		let startPoint = this.state.currentQuestAnswer,
			value,
			bigThis = this,
			diff,
			result,
			animationStyle = this.makeEaseOut(this.newBounce.bind(null, 1.5)),
			animateDuration = 500;

		//TODO:refactor to swith?
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

		diff = startPoint - value;
		if (diff > 50 || diff < -50) {
			console.log("Большой diff " + diff); //здесь выставляем плавный тайминг
			let timingDiff = diff;
			if (timingDiff < 0) timingDiff = -timingDiff;
			animateDuration = timingDiff * 10;
			console.log(animateDuration);
			if (tpmVal < 150 || tpmVal > 450) {
				animationStyle = this.makeEaseOut(this.bounce);
				animateDuration = 800;
			} else animationStyle = this.makeEaseOut(this.newBounce.bind(null, 1.5));
		}
		this.animate({
			duration: animateDuration,
			timing: animationStyle,
			draw: function(progress) {
				//console.log(progress);
				result = startPoint - Math.round(diff * progress);
				var percent = result + "%";
				bigThis.setState({ currentQuestAnswer: result });
			}
		});
	}

	answerSelecting(e) {
		console.log(
			"-----------------------Старый ответ" + this.state.currentQuestAnswer
		);
		console.log(this.state);
		this.setState({ allowDoubleClick: true });
		let value = e.currentTarget.value,
			diff = this.state.currentQuestAnswer - value;
		if (diff > 50 || diff < -50) {
			console.log("большой diff " + diff); //здесь запускаем плавны рендер
			this.animateAfterSelect(e);
			this.setState({ allowDoubleClick: false });
		}

		this.setState({ currentQuestAnswer: value });
	}

	componentWillReceiveProps() {}
	componentWillUpdate() {}

	render() {
		//console.log(this.state);
		var testStyle = {
			background: "green",
			width: "200px"
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
					onMouseUp={this.animateAfterSelect}
					//onMouseUp={this.answerSelecting}
					onChange={this.answerSelecting}
					onTouchEnd={this.answerSelecting}
				/>
				<div>Текущий ответ:{this.state.currentQuestAnswer}</div>
			</div>
		);
	}
}
