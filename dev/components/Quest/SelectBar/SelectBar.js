import React, { Fragment } from "react";
import styles from "./SelectBar.css";

export default class SelectBar extends React.Component {
	render() {
		return (
			<input
				type="range"
				min="1"
				max="5"
				defaultValue={this.props.value}
				className={styles["slider"]}
				id="myRange"
				onMouseUp={this.props.onChange}
				onTouchEnd={this.props.onChange}
			/>
		);
	}
}
