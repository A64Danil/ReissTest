import React from "react";
import shortid from "shortid";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Animate from "react-move/Animate"; // 1. Перенесим импорт
//import Transition from "react-transition-group/Transition";
import styles from "./QuestList.scss";

// QuestList = (props, index) =>
export default class QuestList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		console.log("Cейчас удалим " + this.props.index);
	}

	render() {
		console.log(this.props);
		const { list, index, currentAnswer, show } = this.props;
		//console.log(index);
		let questItems = (
			<div
				className={styles.questWrapper}
				data-key={"QuestID_" + index}
				key={index + shortid.generate()}
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
			<Animate
				show={show}
				start={{
					opacity: 0,
					//backgroundColor: "#0000ff",
					shiftX: 100
				}}
				enter={{
					opacity: [1],
					//backgroundColor: ["#00ff00"],
					timing: { duration: 800 },
					shiftX: [0]
				}}
				update={{
					// catch interrupts e.g. click button in middle of leave
					opacity: [1],
					//backgroundColor: ["#00ff00"],
					timing: { duration: 800 }
				}}
				leave={{
					opacity: [0],
					//backgroundColor: ["#ff0000"],
					timing: { duration: 500 },
					shiftX: [-100]
				}}
			>
				{({ opacity, backgroundColor, shiftX }) => {
					return (
						<div
							style={{
								opacity,
								backgroundColor,
								transform: `translate3D(${shiftX}%, 0, 0)`
							}}
						>
							{questItems}
						</div>
					);
				}}
			</Animate>
		);
	}
}
