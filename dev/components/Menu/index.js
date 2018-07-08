import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./style.scss";

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuIsActive: false
		};

		this.openMenu = this.openMenu.bind(this);
	}

	openMenu() {
		console.log("кликнули на кнопку меню");
		const currentState = this.state.menuIsActive;
		this.setState({ menuIsActive: !currentState });
		console.log(currentState);
	}

	render() {
		return (
			<Fragment>
				<div className={styles["toggle-btn"]} onClick={this.openMenu}>
					☰
				</div>
				<nav id={styles.menu} data-open={this.state.menuIsActive}>
					<ul className={styles["meniList"]}>
						<li className={styles.menu_link}>
							<NavLink exact to="/" activeClassName={styles.menu_link__active}>
								Home
							</NavLink>
						</li>
						<li className={styles.menu_link}>
							<NavLink to="/about" activeClassName={styles.menu_link__active}>
								About
							</NavLink>
						</li>
						<li className={styles.menu_link}>
							<NavLink to="/quests" activeClassName={styles.menu_link__active}>
								Quests
							</NavLink>
						</li>
					</ul>
				</nav>
			</Fragment>
		);
	}
}

export default Menu;
