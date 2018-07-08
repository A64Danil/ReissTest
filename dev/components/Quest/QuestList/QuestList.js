import shortid from "shortid";
import React from "react";
import styles from "./QuestList.scss";

// QuestList = (props, index) =>
export default class QuestList extends React.Component {
	render() {
		console.log(this.props);
		const { list, index, currentAnswer } = this.props;
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
				<p className={styles.questDescr}>{list[index].description}</p>
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
		return questItems;
	}
}
