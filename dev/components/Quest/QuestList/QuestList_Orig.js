import React from "react";
import shortid from "shortid";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
//import Transition from "react-transition-group/Transition";
import styles from "./QuestList.scss";

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0
};

const transitionStyles = {
	entering: { opacity: 0 },
	entered: { opacity: 1 }
};

// QuestList = (props, index) =>
export default class QuestList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: 0,
			entered: false
		};
	}

	componentWillUnmount() {
		console.log("Cейчас удалим вопрос №" + (this.props.index + 1));
		var style = {
			backgroundColor: "#fff318"
		};
	}
	render() {
		const { show } = this.state;
		var style;
		console.log(this.props);
		console.log(this.state);
		const { list, index, currentAnswer } = this.props;
		//console.log(index);
		let questItems = (
			<div
				className={styles.questWrapper}
				data-key={"QuestID_" + index}
				key={index + shortid.generate()}
				style={style}
			>
				<div className={styles.questCounter}>
					{index + 1}/{list.length} желание
				</div>
				<h1 className={styles.questTitle}>{list[index].title}</h1>
				<p className="">{list[index].description}</p>
				<div className={styles.descWrapper} data-descr={currentAnswer}>
					<div className={styles.ldesc}>
						<div className={styles.descTitle}>Низкое</div>
						{list[index].ldesc}
					</div>
					<div className={styles.mdesc}>
						<div className={styles.descTitle}>Среднее</div>
						{list[index].mdesc}
					</div>
					<div className={styles.rdesc}>
						<div className={styles.descTitle}>Высокое</div>
						{list[index].rdesc}
					</div>
				</div>
			</div>
		);
		return (
			<TransitionGroup in={show} timeout={1000} unmountonexit="true">
				<span>
					{state => {
						switch (state) {
							case "entering":
								return "Entering…";
							case "entered":
								return "Entered!";
							case "exiting":
								return "Exiting…";
							case "exited":
								return "Exited!";
						}
					}}
				</span>
				<button
					onClick={() => {
						this.setState(state => ({
							show: 1
						}));
					}}
				>
					Toggle
				</button>

				{questItems}
			</TransitionGroup>
		);
	}
}
