import React from "react";
import shortid from "shortid";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
//import Transition from "react-transition-group/Transition";
import styles from "./QuestList.scss";

import stylesSB from "../SelectBar/SelectBar.css";
import SelectBar from "../SelectBar/SelectBar.js";

// QuestList = (props, index) =>
export default class QuestList extends React.Component {
	render() {
		console.log(this.props);
		console.log(this.state);
		const { list, index, currentAnswer, btnDirection } = this.props;
		//console.log(btnDirection);
		//let animationDirection = "move" + btnDirection;
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
				<div className={stylesSB["slidecontainer"]}>
					<SelectBar
						onChange={this.props.answerAccept}
						//value={this.props.answerReducer[currentQuest]}
						//value={this.state.currentQuestAnswer}
					/>
				</div>
			</div>
		);
		return (
			<CSSTransitionGroup
				transitionName={"move-" + btnDirection}
				transitionAppear={false}
				transitionAppearTimeout={700}
				transitionEnterTimeout={700}
				transitionLeaveTimeout={700}
				transitionEnter={true}
				transitionLeave={true}
			>
				{questItems}
			</CSSTransitionGroup>
		);
	}
}
