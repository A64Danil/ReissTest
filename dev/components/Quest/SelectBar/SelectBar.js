import React from "react";
import styles from "./SelectBar.css";

export default class SelectBar extends React.Component {
	render() {
		return (
			<input
				type="range"
				min="100"
				step="1"
				max="500"
				defaultValue={this.props.value}
				className={styles["slider"]}
				id="myRange"
				onMouseUp={this.props.onChange}
				onTouchEnd={this.props.onChange}
			/>
		);
	}
}
