import React, { Fragment } from "react";
import styles from "./slider.css";

export default class Select extends React.Component {
	render() {
		return (
			<input
				type="range"
				min="1"
				max="10"
				defaultValue="5"
				className={styles["slider"]}
				id="myRange"
				onMouseUp={this.props.onChange}
			/>
		);
	}
}
